import { Link } from './link.model';

const linkController = {
	links: () => Link.find({}),
	addLink: (link: any) => {
		const newLink = new Link({ author: link.author, comment: link.comment });
		return newLink.save();
	}
};

export { linkController };
