import { useState } from 'react';
import axios from 'axios';

const Login = () => {
	const [isLogin, setIsLogin] = useState(true); 
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [errorMessage, setErrorMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		setErrorMessage('');

		try {
			const url = isLogin
				? 'http://localhost:5000/api/users/login'
				: 'http://localhost:5000/api/users/register';
			const payload = isLogin
				? { email, password }
				: { username, email, password };

			const response = await axios.post(url, payload);
			document.cookie = `token=${response.data.token}; path=/`;
			window.location.href = '/';

		} catch (error) {
			setErrorMessage(error.response?.data?.message || 'An error occurred');
		}
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
				<h2 className="text-2xl font-semibold text-gray-800 mb-4">
					{isLogin ? 'Login' : 'Create Account'}
				</h2>

				{errorMessage && (
					<div className="text-red-500 mb-4">{errorMessage}</div>
				)}

				<form onSubmit={handleSubmit}>
					{!isLogin && (
						<div className="mb-4">
							<label className="block text-gray-700 mb-2">Username</label>
							<input
								type="text"
								value={username}
								onChange={(e) => setUsername(e.target.value)}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
								required={!isLogin}
							/>
						</div>
					)}

					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Email</label>
						<input
							type="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					<div className="mb-4">
						<label className="block text-gray-700 mb-2">Password</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
					>
						{isLogin ? 'Login' : 'Create Account'}
					</button>
				</form>

				<div className="mt-4 text-gray-600">
					{isLogin ? (
						<div className="flex justify-center">
							New here ?{' '}
							<button
								onClick={() => setIsLogin(false)}
								className="text-blue-500 hover:underline pl-2"
							>
								Click here to create an account
							</button>
						</div>
					) : (
						<div className="flex justify-center">
							Already have an account ?{' '}
							<button
								onClick={() => setIsLogin(true)}
								className="text-blue-500 hover:underline pl-2"
							>
								Click here to login
							</button>
						</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default Login;
