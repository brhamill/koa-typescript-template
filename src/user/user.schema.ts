import {
	addMockFunctionsToSchema,
	gql,
	makeExecutableSchema
} from 'apollo-server-koa';
import { GraphQLSchema } from 'graphql';
import { userType, userQuery, userMutation } from './schema';
import { voteType } from '../vote/schema/vote.type';
import { linkType } from '../link/schema/link.type';

const userSchema: GraphQLSchema = makeExecutableSchema({
	typeDefs: [userType, userQuery, userMutation, voteType, linkType]
});
addMockFunctionsToSchema({ schema: userSchema });

export { userSchema };


