import * as mongodb from 'mongodb';

const postController = {
	posts: async ({mongo: {Posts}}: any) => {
		return await Posts.find({}).toArray();
	},
	post: async (id: string, {mongo: {Posts}}: any) => {
		const _id = new mongodb.ObjectID(id);
		return await Posts.findOne({ _id });
	},
	addPost: async (post: any, {mongo: {Posts}}: any) => {
		const response = await Posts.insert(post);
		return Object.assign({id: response.insertedId}, post);
	},
	deletePost: async (id: string, {mongo: {Posts}}: any) => {
		const _id = new mongodb.ObjectID(id);
		const deleted = await Posts.findOneAndDelete({ _id });
		return deleted.value;
	},
	updatePost: async (args: any, {mongo: {Posts}}: any) => {
		const _id = new mongodb.ObjectID(args.id);
		const updated = await Posts.findOneAndUpdate({ _id }, { $set: args.post }, { returnOriginal: false });
		return updated.value;
	}
};

export { postController };
