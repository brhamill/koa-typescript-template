import { postResolver } from './post';
import { linkResolver } from './link';
import { userResolver } from './user';
import { voteResolver } from './vote';

const resolvers = [postResolver, linkResolver, userResolver, voteResolver];

export default resolvers;
