import { gql } from 'apollo-server-koa';

const postType = gql`
	type Post {
		id: ID!
		author: String
		comment: String
	}

	input PostInput {
		author: String
		comment: String
	}
`;

export { postType };