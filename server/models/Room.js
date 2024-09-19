// models/Room.js
import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
	name: { type: String, required: true },
	host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
	participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});

const Room = mongoose.model('Room', roomSchema);
export default Room;
