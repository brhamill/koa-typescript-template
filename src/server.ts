import * as Koa from "koa";
import * as Router from "koa-router";
import * as bodyParser from "koa-bodyparser";
import { ApolloServer, PubSub } from "apollo-server-koa";
import * as mongoose from "mongoose";
import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import * as dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";
import { createServer } from 'http';
const { authenticate } = require("./authentication");
const buildDataLoaders = require('./dataloaders');
const formatError = require('./formatError');

// import connectMongo from './mongo-connector';
const connectMongo = require("./mongo-connector");

import {
	CLIENT_ID,
	DB_NAME,
	MONGO_PORT,
	MONGO_URL
} from "./common/util/secrets";

import schemas from "./schema";
import resolvers from "./resolvers";

export const pubsub = new PubSub();

// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

export const client = new OAuth2Client(CLIENT_ID);

const start = async () => {
	const mongo = await connectMongo();

	const app = new Koa();
	const router = new Router();
	let user: any;

	app.use(bodyParser());

	router.post("/graphql", async (ctx, next) => {
		user = await authenticate(ctx.request, mongo.Users) || "";
		await next();
	});

	app.use(router.routes());
	app.use(router.allowedMethods());

	const schema: GraphQLSchema = mergeSchemas({
		schemas,
		resolvers
	});

	// GraphQL
	const server = new ApolloServer({
		schema,
		formatError,
		context: () => {
			return { mongo, user, dataloaders: buildDataLoaders(mongo) };
		},
		debug: false,
	});

	server.applyMiddleware({ app });

	const httpServer = createServer(app.callback());
	server.installSubscriptionHandlers(httpServer);

	const PORT = 4000;

	// app.listen(4000, () => {
	// 	console.log("🚀 Server ready at 4000");
	// });

	httpServer.listen({port: PORT}, () => {
		console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
		console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
	})
};

start();

