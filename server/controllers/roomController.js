// controllers/roomController.js
import Room from '../models/Room.js';

// Create new room
export const createRoom = async (req, res) => {
	const { roomName } = req.body;

	try {
		const room = await Room.create({
			name: roomName,
			host: req.user._id,
			participants: [req.user._id],
		});

		return res.status(201).json(room);
	} catch (error) {
		return res.status(500).json({ message: 'Server error' });
	}
};

// Join existing room
export const joinRoom = async (req, res) => {
	const { roomId } = req.body;

	try {
		const room = await Room.findById(roomId);

		if (!room) {
			return res.status(404).json({ message: 'Room not found' });
		}

		room.participants.push(req.user._id);
		await room.save();

		return res.status(200).json(room);
	} catch (error) {
		return res.status(500).json({ message: 'Server error' });
	}
};
