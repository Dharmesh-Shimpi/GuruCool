import { Server } from 'socket.io';

function setupWebSocket(server) {
	const io = new Server(server, {
		cors: { origin: '*', methods: ['GET', 'POST'] },
	});
	io.listen(3000);

	io.on('connection', (ws) => {
		console.log('New WebSocket connection, ID:', ws.id);

		// Send the user's unique socket ID
		ws.emit('me', ws.id);

		// Disconnect event
		ws.on('disconnect', () => {
			console.log(`User ${ws.id} disconnected`);
			ws.broadcast.emit('meetEnded'); // Notify others that the meeting has ended
		});

		// Start call - forward the WebRTC offer
		ws.on('start', ({ userToCall, signalData, from, name }) => {
			console.log(`Start call from ${from} to ${userToCall}`);
			// Send signal data to the user being called
			io.to(userToCall).emit('start', { signal: signalData, from, name });
		});

		// Join a call - forward WebRTC answer
		ws.on('join', (data) => {
			console.log(`${data.from} joining call to ${data.to}`);
			// Forward the answer to the user who started the call
			io.to(data.to).emit('joined', { signal: data.signal, from: data.from });
		});

		// Additional events can be handled here
	});
}

export { setupWebSocket };
