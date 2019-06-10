import { client } from "../server";
import { CLIENT_ID } from "../common/util/secrets";
import { User } from './user.model';

const userController = {
	users: async (root: any, args: any) => await User.find({}),

	findOrCreateUser: async (token: string) => {
		if (!token) {
			return { authorized: false };
		}
		const googleUser = await userController.verifyGoogleToken(token);
		const user = await userController.checkIfUserExists(googleUser.email);
		if (user) {
			return user;
		} else {
			return await userController.saveUser(googleUser);
		}
	},
	checkIfUserExists: async (email: string) => {
		return await User.findOne({ email }).exec();
	},
	saveUser: async (gUser: any) => {
		const { email, name, picture, given_name, family_name, locale } = gUser;
		const user = { email, name, picture, given_name, family_name, locale };
		const newUser = new User(user);
		return await newUser.save();
	},
	verifyGoogleToken: async (token: string) => {
		const ticket = await client.verifyIdToken({
			idToken: token,
			audience: CLIENT_ID
		});
		return ticket.getPayload();
	},
	createUser: async(args: any, {mongo: {Users}}: any) => {
		const newUser = {
			name: args.name,
			email: args.authProvider.email.email,
			password: args.authProvider.email.password
		};
		const response = await Users.insertOne(newUser);
		return Object.assign({id: response.insertedId}, newUser);
	},
	signinUser: async(args: any, {mongo: {Users}}: any) => {
		const user = await Users.findOne({email: args.email.email});
		if (args.email.password === user.password) {
			return { token: `token-${user.email}`, user};
		}
	}
};

export { userController };
