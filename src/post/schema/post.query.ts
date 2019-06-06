import { gql } from 'apollo-server-koa';

const postQuery = gql`
	type Query {
		posts: [Post]
		post(id: String): Post
	}
`;

export { postQuery };
