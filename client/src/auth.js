// auth.js
import { jwtDecode } from 'jwt-decode';

export const getUsernameFromToken = (token) => {
	try {
		const decoded = jwtDecode(token);
		return decoded.username;
	} catch (error) {
		console.error('Failed to decode token', error);
		return null;
	}
};
