import { addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { voteType, voteMutation } from './schema';
import { userType } from '../user/schema/user.type';
import { linkType } from '../link/schema/link.type';

const voteSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [voteType, voteMutation, userType, linkType]
});
addMockFunctionsToSchema({ schema: voteSchema });

export { voteSchema };
