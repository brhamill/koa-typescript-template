import { pubsub } from '../server';
import { linkController } from './link.controller';
import { URL } from 'url';

class ValidationError extends Error {
	field: any;

	constructor(message: any, field: any) {
		super(message);
		this.field = field;
	}
}

function assertValidLink ({url}: any) {
	try {
		new URL(url);
	}
	catch (error) {
		throw new ValidationError('Link validation error: invalid url.', 'url');
	}
}

function buildFilters({OR = [], description_contains, url_contains}: any) {
	const filter: any = (description_contains || url_contains) ? {} : undefined;
	if (description_contains) {
		filter.description = {$regex: `.*${description_contains}.*`};
	}
	if (url_contains) {
		filter.url = {$regex: `.*${url_contains}.*`};
	}

	let filters = filter ? [filter] : [];
	for (let i = 0; i < OR.length; i++) {
		filters = filters.concat(buildFilters(OR[i]));
	}
	return filters;
}

const linkResolver = {
	Subscription: {
		Link: {
			subscribe: () => pubsub.asyncIterator('Link')
		}
	},
	Query: {
		getLinks: async (_: any, {filter, first, skip}: any, context: any) => {
			const query = filter ? {$or: buildFilters(filter)} : {};
			return await linkController.getLinks({query, first, skip}, context);
		},
		getLink: async (_: any, { id }: any, context: any) => {
			return await linkController.getLink(id, context);
		}
	},
	Mutation: {
		createLink: async (_: any, args: any, context: any) => {
			// assertValidLink(args.link.url);
			return await linkController.createLink(args, context);
		},
		removeLink: async (_: any, { id }: any, context: any) => {
			return await linkController.removeLink(id, context);
		},
		updateLink: async (_: any, args: any, context: any) => {
			return await linkController.updateLink(args, context);
		}
	},
	Link: {
		id: (root: { _id: any; id: any; }) => root._id || root.id,

		postedBy: async ({postedById}: any, args: any, {dataloaders: {userLoader}}: any) => {
			return await userLoader.load(postedById);
		},

		votes: async ({_id}: any, args: any, {mongo: {Votes}}: any) => {
			return await Votes.find({linkId: _id}).toArray();
		}
	}
};

export { linkResolver };
