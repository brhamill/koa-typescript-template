import { gql } from 'apollo-server-koa';

const userType = gql`
	type User {
		id: ID!
		name: String!
		email: String
		picture: String
		given_name: String
		family_name: String
		locale: String
		votes: [Vote!]!
	}

	input AuthProviderSignupData {
		email: AUTH_PROVIDER_EMAIL
	}

	input AUTH_PROVIDER_EMAIL {
		email: String!
		password: String!
	}

	type SigninPayload {
		token: String
		user: User
	}
`;

export { userType };
