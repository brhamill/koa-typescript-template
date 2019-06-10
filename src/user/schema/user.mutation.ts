import { gql } from 'apollo-server-koa';

const userMutation = gql`
	type Mutation {
		createUser(name: String!, authProvider: AuthProviderSignupData!): User
		signinUser(email: AUTH_PROVIDER_EMAIL): SigninPayload
	}
`;
export { userMutation };
