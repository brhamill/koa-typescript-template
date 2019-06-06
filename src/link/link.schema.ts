import { addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { linkType, linkQuery, linkMutation } from './schema';

const linkSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [linkType, linkQuery, linkMutation]
});
addMockFunctionsToSchema({ schema: linkSchema });

export { linkSchema };
