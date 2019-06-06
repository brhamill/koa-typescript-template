import * as Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import * as mongoose from 'mongoose';
import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from 'graphql-tools';
import * as dotenv from "dotenv";
import { OAuth2Client } from 'google-auth-library';

// import connectMongo from './mongo-connector';
const connectMongo  = require('./mongo-connector');

// import { MongoHelper } from './helpers/mongo.helper';
import { userController } from "./user/user.controller";

import {
	CLIENT_ID,
	DB_NAME,
	MONGO_PORT,
	MONGO_URL
} from "./common/util/secrets";

import schemas from "./schema";
import resolvers from "./resolvers";


// Load environment variables from .env file, where API keys and passwords are configured
dotenv.config({ path: ".env" });

export const client = new OAuth2Client(CLIENT_ID);

const start = async () => {
	const mongo = await connectMongo();

// const mongo = await MongoHelper.connect(`mongodb://localhost:27017/graphExample`); 

// help to debug mongoose
// mongoose.set("debug", true);

// mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${DB_NAME}`, { useNewUrlParser: true });

const schema: GraphQLSchema = mergeSchemas({
	schemas,
	resolvers
});

// GraphQL
const server = new ApolloServer({
	schema,
	context: () => {
		return {mongo};
	}
	// context: async ({ ctx }: any) => {
	// 	if (!req || !req.headers) {
	// 		return;
	// 	}

	// 	const token = req.headers.authorization || "";
	// 	const checkToken = await userController.findOrCreateUser(token);
	// 	if (!checkToken.hasOwnProperty("authorized")) {
	// 		return { user: checkToken, authorized: true };
	// 	}
	// 	return checkToken;
	// },
	// tracing: true
});





const app = new Koa();
server.applyMiddleware({ app });

const PORT = 4000;

app.listen(4000, () => {
  console.log('🚀 Server ready at 4000');
});

// app.on('listening', async () => {
//   console.info(`Listening on port ${PORT}`);
//   try {
//     await MongoHelper.connect(`mongodb://localhost:27017/graphExample`);
//     console.info(`Connected to Mongo!`);
//   } catch (err) {
//     console.error(`Unable to connect to Mongo!`, err);
// 	}
// });


};

start();

