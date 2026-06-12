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

//Form state, this creates a state variable called formData, it's a form containing all values
function SignUpForm() {
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

      // Optional: redirect to login page after registration
      // window.location.href = '/login';
    } catch (error) {
      console.error(error);
      setMessage('Could not connect to the server.');
    } finally {
      setLoading(false);
    }
  }

  //runs where user clicks on sign up
  return (
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>

      <div>
        <label>First Name:</label>
        <br />
        <input
          type="text"
          name="firstName"
          value={formData.firstName} //controlled components, react controls the value, basically all inputs, not the browser
          onChange={handleChange} //runs everytime user types
          required
        />
      </div>

      <br />

      <div>
        <label>Last Name:</label>
        <br />
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Username:</label>
        <br />
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Email:</label>
        <br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Phone:</label>
        <br />
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Date of Birth:</label>
        <br />
        <input
          type="date"
          name="dob"
          value={formData.dob}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Gender:</label>
        <br />
        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </div>

      <br />

      <div>
        <label>Password:</label>
        <br />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <div>
        <label>Confirm Password:</label>
        <br />
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <br />

      <button type="submit" disabled={loading}>
        {loading ? 'Registering...' : 'Register'}
      </button>

      {message && <p>{message}</p>}
    </form>
  );
}

export default SignUpForm;
