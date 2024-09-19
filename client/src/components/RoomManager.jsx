import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode'; // Correct import
import { SocketContext } from '../webrtc';

const RoomManager = () => {
	const { me, name, setName, callAccepted, callEnded, leave, start } =
		useContext(SocketContext);
	const [idToCall, setIdToCall] = useState('');
	const navigate = useNavigate();

	// Retrieve username from JWT and set it
	useEffect(() => {
		const token = Cookies.get('token');
		if (token) {
			const decoded = jwtDecode(token); 
			setName(decoded.username);
		}
	}, [setName]);

	const handleCreate = () => {
		alert(`Share your ID: ${me}`); // Show the user's ID to be shared
	};

	const handleJoin = () => {
		if (idToCall) {
			start(idToCall); // Initiate the call using the entered ID
			navigate('/video-call'); // Navigate to the video call page
		}
	};

	return (
		<div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-lg">
				<h2 className="text-2xl font-semibold text-gray-800 mb-6">
					Room Management
				</h2>
				{/* Display the "Create Room" button with 'me' ID */}
				<button
					onClick={handleCreate}
					className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mb-4"
				>
					Create Room (Share Your ID)
				</button>

				{/* Input field to join a room */}
				<input
					type="text"
					placeholder="Enter ID to call"
					className="border border-gray-300 p-2 rounded w-full mb-4"
					value={idToCall}
					onChange={(e) => setIdToCall(e.target.value)}
				/>
				<button
					onClick={handleJoin}
					className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
				>
					Join Room
				</button>
			</div>
		</div>
	);
};

export default RoomManager;
