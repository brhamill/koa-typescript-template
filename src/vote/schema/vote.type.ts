import { gql } from 'apollo-server-koa';

const voteType = gql`
	type Vote {
		id: ID!
		user: User!
		link: Link!
	}
`;

export { voteType };