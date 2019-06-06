import * as mongoose from 'mongoose';

const LinkSchema = new mongoose.Schema({
	author: String,
	comment: String
});

const Link = mongoose.model('links', LinkSchema);
export { Link };
