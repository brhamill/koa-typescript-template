import { addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { postType, postQuery, postMutation } from './schema';

const postSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [postType, postQuery, postMutation]
});
addMockFunctionsToSchema({ schema: postSchema });

export { postSchema };
