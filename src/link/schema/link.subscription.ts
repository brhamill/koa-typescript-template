import { gql } from 'apollo-server-koa';

const linkSubscription = gql`
	type Subscription {
		Link(filter: LinkSubscriptionFilter): LinkSubscriptionPayload
	}

  input LinkSubscriptionFilter {
    mutation_in: [_ModelMutationType!]
  }

  type LinkSubscriptionPayload {
    mutation: _ModelMutationType!
    node: Link
  }

  enum _ModelMutationType {
    CREATED
    UPDATED
    DELETED
  }
`;

export { linkSubscription };