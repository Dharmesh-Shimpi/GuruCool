// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const protect = async (req, res, next) => {
	try {
		const { token } = req.body;
		const decoded = jwt.verify(token, JWT_SECRET);
		next();
	} catch (error) {
		return res.status(401).json({ message: 'Not authorized, token failed' });
	}
};
