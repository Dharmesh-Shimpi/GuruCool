// controllers/userController.js
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

// Generate JWT
const generateToken = (id, username) => {
	return jwt.sign({ id, username }, JWT_SECRET, {
		expiresIn: '7d',
	});
};

// Register new user
export const registerUser = async (req, res) => {
	const { username, email, password } = req.body;
	console.log(username);

	try {
		const userExists = await User.findOne({ email });

		if (userExists) {
			return res.status(400).json({ message: 'User already exists' });
		}

		const user = await User.create({
			username,
			email,
			password,
		});

		return res.status(201).json({
			token: generateToken(user._id, user.username),
		});
	} catch (error) {
		return res.status(500).json({ message: 'Server error' });
	}
};

// Login user
export const loginUser = async (req, res) => {
	const { email, password } = req.body;

	try {
		const user = await User.findOne({ email });

		if (user && (await user.matchPassword(password))) {
			return res.json({
				token: generateToken(user._id, user.username),
			});
		} else {
			return res.status(400).json({ message: 'Invalid credentials' });
		}
	} catch (error) {
		return res.status(500).json({ message: 'Server error' });
	}
};

// Verify JWT
export const verifyJWT = (req, res) => {
	return res.status(200).json({ message: 'Token is valid', user: req.user });
};
