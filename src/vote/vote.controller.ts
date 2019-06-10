import { ObjectID } from 'mongodb';

const voteController = {
	createVote: async (args: any, {mongo: {Votes}, user}: any) => {
    const newVote = {
      userId: user && user._id,
      linkId: new ObjectID(args.linkId)
    };
    const response = await Votes.insertOne(newVote);
		return Object.assign({id: response.insertedId}, newVote);
	},
};

export { voteController };
