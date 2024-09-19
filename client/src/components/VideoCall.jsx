import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../webrtc';

const VideoComponent = () => {
	const {
		myVideo,
		userVideo,
		stream,
		callAccepted,
		callEnded,
		name,
		call,
		leave,
	} = useContext(SocketContext);

	useEffect(() => {
		if (myVideo.current && stream) {
			myVideo.current.srcObject = stream;
		}
	}, [stream, myVideo]);

	useEffect(() => {
		if (userVideo.current && callAccepted && !callEnded) {
			if (call.userStream) {
				userVideo.current.srcObject = call.userStream;
			}
		}
	}, [callAccepted, callEnded, userVideo, call.userStream]);

	return (
		<div className="flex flex-col items-center p-4 space-y-4">
			{/* My video */}
			<div className="flex flex-col items-center space-y-2">
				<p className="text-lg font-semibold text-gray-700">{name || 'You'}</p>{' '}
				{/* Display my username */}
				<video
					playsInline
					muted
					ref={myVideo}
					autoPlay
					className="w-72 border-2 border-gray-300 rounded-lg shadow-lg"
				/>
			</div>

			{/* User's video */}
			{callAccepted && !callEnded && (
				<div className="flex flex-col items-center space-y-2">
					<p className="text-lg font-semibold text-gray-700">
						{call.name || 'User'}
					</p>{' '}
					{/* Display user's username */}
					<video
						playsInline
						ref={userVideo}
						autoPlay
						className="w-72 border-2 border-gray-300 rounded-lg shadow-lg"
					/>
				</div>
			)}

			{/* Leave button */}
			{callAccepted && !callEnded && (
				<button
					onClick={leave}
					className="mt-4 px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 transition-colors"
				>
					Leave
				</button>
			)}
		</div>
	);
};

export default VideoComponent;
