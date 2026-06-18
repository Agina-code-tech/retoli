/*Flow I should have; 
Component loads.
User types in fields.
handleChange() updates formData.
User clicks signup.
handleSubmit() runs.
Passwords are checked.
Data is sent using fetch().
Server responds.
Success or error message is shown.
Form is cleared.
Loading stops.*/

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

//Form state, this creates a state variable called formData, it's a form containing all values
function SignUpForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    phone: '',
    dob: '',
    gender: '',
    password: '',
    confirmPassword: '',
  });

  //Message state stores the messsage and loading state tracks whether the form is currently sending data.Initially, it's false because it's not sending data, as it submits it's true, then turns back to false.
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  //runs when a user types into an input
  //event contains information about what happened, event.target refers to the element that triggered the event. .value gets the text inside the input
  //get the previous data, is getting the current state which was empty, copies existing values, then when user types the value it updates
  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  }

  //runs when form is submited
  async function handleSubmit(event) {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }

    //code that might fail goes to the try block
    //set message clears any previous messages
    try {
      setLoading(true);
      setMessage('');

      //fetch sends an http request to backend
      //post means I'm sending data to the server
      const response = await fetch(
        'https://charity-minds-backend.onrender.com/api/v1/auth/register',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        },
      );

      //without await, javascript would keep running before we get a response from server
      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || 'Registration failed.');
        return;
      }

      setMessage('Registration successful!');
      console.log('User created:', data);

      setFormData({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        phone: '',
        dob: '',
        gender: '',
        password: '',
        confirmPassword: '',
      });

      navigate('/dashboard');
      // (use react router instead)
    } catch (error) {
      console.error(error);
      setMessage('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  }

  //runs where user clicks on sign up
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl bg-gray-900 rounded-2xl p-8 border border-purple-900 shadow-[0_0_30px_rgba(168,85,247,0.15)]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-purple-500">Create Account</h2>

          <div className="w-20 h-1 bg-purple-500 mx-auto rounded-full mt-3 mb-4"></div>

          <p className="text-gray-400">Join Retoli Today!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                First Name
              </label>

              <input
                type="text"
                name="firstName"
                value={formData.firstName} //controlled components, react controls the value, basically all inputs, not the browser
                onChange={handleChange} //runs everytime user types
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Last Name
              </label>

              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Username
              </label>

              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Date of Birth
              </label>

              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-gray-200 font-medium mb-2">
              Gender
            </label>

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div>
              <label className="block text-gray-200 font-medium mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 text-white rounded-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg text-center font-medium ${
                message.toLowerCase().includes('successful')
                  ? 'bg-green-900/30 text-green-400 border border-green-800'
                  : 'bg-red-900/30 text-red-400 border border-red-800'
              }`}
            >
              {message}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white font-semibold py-3 rounded-lg transition duration-300 disabled:bg-gray-700 disabled:cursor-not-allowed"
          >
            {loading ? 'Registering...' : 'Create Account'}
          </button>

          <p className="text-center text-gray-400">
            Already have an account?{' '}
            <Link
              to="/signin"
              className="text-purple-400 hover:text-purple-300 font-semibold"
            >
              Sign In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
