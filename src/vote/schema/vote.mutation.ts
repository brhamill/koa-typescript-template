import { gql } from 'apollo-server-koa';

const voteMutation = gql`
	type Mutation {
		createVote(linkId: ID!): Vote
	}
`;
export { voteMutation };
