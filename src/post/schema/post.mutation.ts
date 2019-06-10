import { gql } from 'apollo-server-koa';

const postMutation = gql`
	type Mutation {
		createPost(post: PostInput): Post
		removePost(id: String!): Post
		updatePost(id: String!, post: PostInput): Post
	}
`;
export { postMutation };
