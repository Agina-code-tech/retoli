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

function SignInForm() {
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

      // Optional: redirect after login
    } catch (error) {
      console.error(error);
      setMessage('Could not connect to the server.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign In</h2>

      <div>
        <label>Email:</label>
        <br />
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Enter your email"
          required
        />
      </div>

      <br />

      <div>
        <label>Password:</label>
        <br />
        <input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          required
        />
      </div>

      <br />

      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Signing in...' : 'Sign In'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default SignInForm;
