import { MongoClient, Db } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017';
const dbName = 'graphExample';

module.exports = async () => {
  let db: Db;

  await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
    .then(client => {
      console.log('Successfully connected to database');
      db = client.db(dbName);
    })
    .catch(err => console.error(err));

  return {
    Links: db.collection('links'),
    Posts: db.collection('posts')
  }
};