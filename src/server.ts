import * as Koa from 'koa';
import { ApolloServer } from 'apollo-server-koa';
import * as mongoose from 'mongoose';
import { GraphQLSchema } from 'graphql';
import { mergeSchemas } from 'graphql-tools';
import * as dotenv from "dotenv";

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

// help to debug mongoose
mongoose.set("debug", true);

mongoose.connect(`mongodb://${MONGO_URL}:${MONGO_PORT}/${DB_NAME}`, { useNewUrlParser: true });

const schema: GraphQLSchema = mergeSchemas({
	schemas,
	resolvers
});

// GraphQL
const server = new ApolloServer({
	schema
});

const app = new Koa();
server.applyMiddleware({ app });

app.listen(4000, () => {
  console.log('🚀 Server ready at 4000');
});
