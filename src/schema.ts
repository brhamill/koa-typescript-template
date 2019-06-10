import { postSchema } from './post';
import { linkSchema } from './link';
import { userSchema } from './user';
import { voteSchema } from './vote';

const schemas = [postSchema, linkSchema, userSchema, voteSchema];

export default schemas;
