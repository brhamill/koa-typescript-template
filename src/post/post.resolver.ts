import { postController } from './post.controller';

const postResolver = {
	Query: {
		posts: async (root: any, args: any, context: any) => {
			return await postController.posts(context);
		},
		post: async (root: any, { id }: any, context: any) => {
			return await postController.post(id, context);
		}
	},
	Mutation: {
		addPost: async (root: any, args: any, context: any) => {
			return await postController.addPost(args, context);
		},
		deletePost: async (root: any, { id }: any, context: any) => {
			return await postController.deletePost(id, context);
		},
		updatePost: async (root: any, args: any, context: any) => {
			return await postController.updatePost(args, context);
		}
	},
	Post: {
		id: (root: { _id: any; id: any; }) => root._id || root.id
	}
};

export { postResolver };
