import { linkController } from './link.controller';

const linkResolver = {
	Query: {
		links(root: any, args: any, context: any) {
			return linkController.links();
		}
	},
	Mutation: {
		addLink(root: any, args: any, context: any) {
			return linkController.addLink(args);
		}
	}
};

export { linkResolver };
