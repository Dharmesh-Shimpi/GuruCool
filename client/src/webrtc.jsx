import { createContext, useState, useRef, useEffect } from 'react';
import { io } from 'socket.io-client';
import Peer from 'peerjs';

const SocketContext = createContext();

const socket = io('http://localhost:5000');

const ContextProvider = ({ children }) => {
	const [stream, setStream] = useState(null);
	const [me, setMe] = useState('');
	const [call, setCall] = useState({
		isReceivedCall: false,
		from: '',
		userStream: null,
		name: '',
	});
	const [callAccepted, setCallAccepted] = useState(false);
	const [callEnded, setCallEnded] = useState(false);
	const [name, setName] = useState('');
	const myVideo = useRef();
	const userVideo = useRef();
	const connectionRef = useRef();
	const peerRef = useRef();

	useEffect(() => {
		const peer = new Peer({
			host: 'localhost',
			port: 9000,
			path: '/peerjs',
			secure: false,
		});

		peerRef.current = peer;

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((currentStream) => {
				setStream(currentStream);
				if (myVideo.current) myVideo.current.srcObject = currentStream;
			});

		peer.on('open', (id) => {
			setMe(id);
			socket.emit('me', id); // Send peer ID to server
		});

		peer.on('call', (incomingCall) => {
			setCall({
				isReceivedCall: true,
				from: incomingCall.peer,
				userStream: null,
				name: '',
			});
			incomingCall.answer(stream);
			incomingCall.on('stream', (remoteStream) => {
				setCall((prevCall) => ({ ...prevCall, userStream: remoteStream }));
			});
		});

		return () => {
			peer.disconnect();
		};
	}, []);

	const start = (idToCall, userName) => {
		if (!me || !stream) {
			console.error('Cannot start the call. Stream or ID is missing.');
			return;
		}

		const call = peerRef.current.call(idToCall, stream);

		call.on('stream', (remoteStream) => {
			if (userVideo.current) {
				userVideo.current.srcObject = remoteStream;
			}
		});

		setCall({
			isReceivedCall: false,
			from: idToCall,
			userStream: null,
			name: userName,
		});
		setCallAccepted(true);
		connectionRef.current = call;
	};

	const join = () => {
		setCallAccepted(true);
	};

	const leave = () => {
		setCallEnded(true);
		if (connectionRef.current) connectionRef.current.close(); // Close the connection
	};

	return (
		<SocketContext.Provider
			value={{
				call,
				callAccepted,
				myVideo,
				userVideo,
				stream,
				name,
				setName,
				callEnded,
				me,
				join,
				leave,
				start,
			}}
		>
			{children}
		</SocketContext.Provider>
	);
};

export { ContextProvider, SocketContext };
