import {
	addMockFunctionsToSchema,	
	gql,
	makeExecutableSchema
} from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';

const helloSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: gql`
		type Query {
			hello: String
		}
	`
});
addMockFunctionsToSchema({ schema: helloSchema });

export { helloSchema };