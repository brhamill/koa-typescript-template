import { voteController } from './vote.controller';

const voteResolver = {
	Mutation: {
		createVote: async (_: any, args: any, context: any) => {
			return await voteController.createVote(args, context);
		},
  },
  Vote: {
    id: (root: { _id: any; id: any; }) => root._id || root.id,
    
    user: async ({userId}: any, args: any, {dataloaders: {userLoader}}: any) => {
      return await userLoader.load(userId);
    },

    link: async ({linkId}: any, args: any, {mongo: {Links}}: any) => {
      return await Links.findOne({_id: linkId});
    }
  }
};

export { voteResolver };
