import { gql } from 'apollo-server-koa';

const linkType = gql`
  type Link {
    id: ID!
    url: String!
    description: String!
  }
`;

export { linkType };