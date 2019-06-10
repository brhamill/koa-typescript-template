import * as mongodb from 'mongodb';
import { pubsub } from '../server';

const linkController = {
	getLinks: async ({query, first, skip}: any, {mongo: {Links}}: any) => {
		const cursor = await Links.find(query);
		if (first) {
			cursor.limit(first);
		}
		if (skip) {
			cursor.skip(skip);
		}
		return cursor.toArray();
	},
	getLink: async (id: string, {mongo: {Links}}: any) => {
		const _id = new mongodb.ObjectID(id);
		return await Links.findOne({ _id });
	},
	createLink: async (args: any, {mongo: {Links}, user}: any) => {
		const newLink = Object.assign({postedById: user && user._id}, args.link);
		const response = await Links.insertOne(newLink);
		pubsub.publish('Link', {Link: {mutation: 'CREATED', node: newLink}});
		return Object.assign({id: response.insertedId}, newLink);
	},
	removeLink: async (id: string, {mongo: {Links}}: any) => {
		const _id = new mongodb.ObjectID(id);
		const deleted = await Links.findOneAndDelete({ _id });
		return deleted.value;
	},
	updateLink: async (args: any, {mongo: {Links}}: any) => {
		const _id = new mongodb.ObjectID(args.id);
		const updated = await Links.findOneAndUpdate({ _id }, { $set: args.link }, { returnOriginal: false });
		return updated.value;
	}
};

export { linkController };
