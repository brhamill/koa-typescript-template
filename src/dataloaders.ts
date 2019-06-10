import * as DataLoader from 'dataloader';

async function batchUsers (Users: any, keys: any) {
  return await Users.find({_id: {$in: keys}}).toArray();
}

module.exports = ({Users}: any) => ({
  userLoader: new DataLoader(
    keys => batchUsers(Users, keys),
    {cacheKeyFn: key => key.toString()}
  )
});