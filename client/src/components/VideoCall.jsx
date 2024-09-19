import React, { useContext, useEffect } from 'react';
import { SocketContext } from '../webrtc';

const VideoComponent = () => {
	const { myVideo, userVideo, stream, callAccepted, callEnded, name, call } =
		useContext(SocketContext);

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
		<div
			style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
		>
			{/* My video */}
			<div style={{ marginBottom: '10px', textAlign: 'center' }}>
				<p>{name || 'You'}</p> {/* Display my username */}
				<video
					playsInline
					muted
					ref={myVideo}
					autoPlay
					style={{ width: '300px', border: '1px solid black' }}
				/>
			</div>

			{/* User's video */}
			{callAccepted && !callEnded && (
				<div style={{ marginBottom: '10px', textAlign: 'center' }}>
					<p>{call.name || 'User'}</p> {/* Display user's username */}
					<video
						playsInline
						ref={userVideo}
						autoPlay
						style={{ width: '300px', border: '1px solid black' }}
					/>
				</div>
			)}
		</div>
	);
};

export default VideoComponent;
