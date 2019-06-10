import { AuthenticationError } from 'apollo-server-koa';
import { userController } from './user.controller';
const userResolver = {
	Query: {
		users: async (root: any, args: any, context: any) => {
			if (!context.authorized) {
				console.error("User not authorized");
				throw new AuthenticationError("you must be logged in");
			}
			return await userController.users(root, args.user);
		},
		validateUser: async (root: any, args: any) => {
			return await userController.findOrCreateUser(args.idToken);
		}
	},
	Mutation: {
		createUser: async (_: any, args: any, context: any) => {
			return await userController.createUser(args, context);
		},
		signinUser: async (_: any, args: any, context: any) => {
			return await userController.signinUser(args, context);
		}
	},
	User: {
		id: (root: { _id: any; id: any; }) => root._id || root.id,

		votes: async ({_id}: any, args: any, {mongo: {Votes}}: any) => {
			return await Votes.find({userId: _id}).toArray();
		}
	}};

export { userResolver };
