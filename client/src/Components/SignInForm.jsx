/*The flow
Component Loads
User enters email
User enters password
State updates
User clicks Sign In
handleSubmit runs
Loading starts
POST request sent
Backend checks credentials
Success or Failure
Message displayed
Loading stops*/

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function SignInForm() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();

    setMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(
        'https://charity-minds-backend.onrender.com/api/v1/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include', // important because backend uses cookies, tells the browser Include cookies when talking to the backend. authentication systems store login information in cookies.
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Login failed. Please try again.');
        setIsLoading(false);
        return;
      }

      setMessage('Sign in successful!');

      navigate('/dashboard'); //react router redirecting
    } catch (error) {
      console.error(error);
      setMessage('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-2xl p-8 border border-purple-900 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-500">Welcome Back</h2>

          <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full mt-3 mb-4"></div>

          <p className="text-gray-400">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Email
            </label>

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
            />
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-center font-medium ${
                message.toLowerCase().includes('success')
                  ? 'bg-green-900/30 text-green-400 border border-green-800'
                  : 'bg-red-900/30 text-red-400 border border-red-800'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <p className="text-center text-gray-400">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignInForm;
