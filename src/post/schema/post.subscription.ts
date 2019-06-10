import { gql } from 'apollo-server-koa';

const postSubscription = gql`
	type Subscription {
		postAdded: Post
	}
`;

export { postSubscription };
