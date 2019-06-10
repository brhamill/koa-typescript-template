import { pubsub } from '../server';
import { postController } from './post.controller';

const POST_ADDED = "POST_ADDED";

const postResolver = {
	Subscription: {
		postAdded: {
			subscribe: () => pubsub.asyncIterator([POST_ADDED])
		}
	},
	Query: {
		getPosts: async (_: any, __: any, context: any) => {
			return await postController.getPosts(context);
		},
		getPost: async (_: any, { id }: any, context: any) => {
			return await postController.getPost(id, context);
		}
	},
	Mutation: {
		createPost: async (_: any, args: any, context: any) => {
			pubsub.publish(POST_ADDED, { postAdded: args.post });
			return await postController.createPost(args, context);
		},
		removePost: async (_: any, { id }: any, context: any) => {
			return await postController.removePost(id, context);
		},
		updatePost: async (_: any, args: any, context: any) => {
			return await postController.updatePost(args, context);
		}
	},
	Post: {
		id: (root: { _id: any; id: any; }) => root._id || root.id
	}
};

export { postResolver };
