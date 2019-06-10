import { addMockFunctionsToSchema, makeExecutableSchema } from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { linkType, linkQuery, linkMutation, linkSubscription } from './schema';
import { userType } from '../user/schema/user.type';
import { voteType } from '../vote/schema/vote.type';

const linkSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [linkType, linkQuery, linkMutation, linkSubscription, userType, voteType]
});
addMockFunctionsToSchema({ schema: linkSchema });

export { linkSchema };
