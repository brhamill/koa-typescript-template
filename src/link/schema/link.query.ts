import { gql } from 'apollo-server-koa';

const linkQuery = gql`
	type Query {
		getLinks(filter: LinkFilter, first: Int, skip: Int): [Link!]!
		getLink(id: String): Link
	}
`;

export { linkQuery };
