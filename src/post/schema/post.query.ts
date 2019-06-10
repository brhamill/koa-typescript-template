import { gql } from 'apollo-server-koa';

const postQuery = gql`
	type Query {
		getPosts: [Post]
		getPost(id: String): Post
	}
`;

export { postQuery };
