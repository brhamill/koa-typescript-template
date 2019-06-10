import { gql } from 'apollo-server-koa';

const linkMutation = gql`
	type Mutation {
		createLink(link: LinkInput): Link
		removeLink(id: String!): Link
		updateLink(id: String!, link: LinkInput): Link
	}
`;
export { linkMutation };
