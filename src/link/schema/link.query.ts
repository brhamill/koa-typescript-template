import { gql } from 'apollo-server-koa';

const linkQuery = gql`
  type Query {
    allLinks: [Link!]!
  }
`;

export { linkQuery };
