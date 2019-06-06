import { gql } from 'apollo-server-koa';

const postMutation = gql`
	type Mutation {
		addPost(author: String, comment: String): Post
		deletePost(id: ID!): Post
		updatePost(id: String, post: PostInput): Post
	}
`;
export { postMutation };
