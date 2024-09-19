import React, { useEffect, useState } from 'react';
import {
	createBrowserRouter,
	RouterProvider,
	Navigate,
} from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';
import { getUsernameFromToken } from './auth'; // Import the utility function
import Login from './components/Login';
import RoomManager from './components/RoomManager';
import VideoCall from './components/VideoCall';

const App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [isCheckingAuth, setIsCheckingAuth] = useState(true);
	const [username, setUsername] = useState('');

	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			axios
				.post('http://localhost:5000/api/users/verify', { token })
				.then((response) => {
					if (response.status === 200) {
						setIsAuthenticated(true);
						setUsername(getUsernameFromToken(token)); // Extract username
					} else {
						setIsAuthenticated(false);
					}
				})
				.catch((err) => {
					console.error('JWT verification failed', err);
					setIsAuthenticated(false);
				})
				.finally(() => setIsCheckingAuth(false));
		} else {
			setIsAuthenticated(false);
			setIsCheckingAuth(false);
		}
	}, []);

	const handleCreateRoom = (roomId) => {
		// Your existing code
	};

	const handleJoinRoom = (roomId) => {
		// Your existing code
	};

	const ProtectedRoute = ({ children }) => {
		if (isCheckingAuth) return <div>Loading...</div>;
		return isAuthenticated ? children : <Navigate to="/login" />;
	};

	const router = createBrowserRouter([
		{ path: '/login', element: <Login /> },
		{
			path: '/',
			element: (
				<ProtectedRoute>
					<RoomManager
						onCreateRoom={handleCreateRoom}
						onJoinRoom={handleJoinRoom}
					/>
				</ProtectedRoute>
			),
		},
		{
			path: '/video-call',
			element: (
				<ProtectedRoute>
					<VideoCall
						username={username} 
					/>
				</ProtectedRoute>
			),
		},
	]);

	if (isCheckingAuth) return <div>Loading...</div>;

	return <RouterProvider router={router} />;
};

export default App;
