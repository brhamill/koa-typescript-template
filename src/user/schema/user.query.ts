import { gql } from 'apollo-server-koa';

const userQuery = gql`
	type Query {
		users: [User]
		validateUser(idToken: String): User
	}
`;
export { userQuery };
