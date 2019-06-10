import { gql } from 'apollo-server-koa';

const linkType = gql`
  type Link {
    id: ID!
    url: String!
    description: String!
    postedBy: User
    votes: [Vote!]!
  }

  input LinkInput {
    url: String
    description: String
  }

  input LinkFilter {
    OR: [LinkFilter!]
    description_contains: String
    url_contains: String
  }
`;

export { linkType };
