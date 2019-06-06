import { gql } from 'apollo-server-koa';

const linkMutation = gql`
  type Mutation {
    createLink(url: String!, description: String!): Link
  }
`;
export { linkMutation };
