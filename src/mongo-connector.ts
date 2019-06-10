import { MongoClient, Db, Logger } from 'mongodb';

const MONGO_URL = 'mongodb://localhost:27017';
const dbName = 'graphExample';

module.exports = async () => {
  let db: Db;

  await MongoClient.connect(MONGO_URL, { useNewUrlParser: true })
    .then(client => {
      console.log('Successfully connected to database');
      db = client.db(dbName);

      let logCount = 0;
      Logger.setCurrentLogger((msg, state) => {
        console.log(`MONGO DB REQUEST ${++logCount}: ${msg}`);
      });
      Logger.setLevel('debug');
      Logger.filter('class', ['Cursor']);
    })
    .catch(err => console.error(err));

  return {
    Links: db.collection('links'),
    Posts: db.collection('posts'),
    Users: db.collection('users'),
    Votes: db.collection('votes')
  }
};