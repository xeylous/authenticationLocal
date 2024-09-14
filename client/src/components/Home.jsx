'use client';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleForm = () => {
    setIsRegister(!isRegister);
    setError('');
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        // Registration request
        const response = await axios.post('http://localhost:5000/api/auth/register', formData);
        if (response.status === 201) {
          alert('Registration successful! You can now login.');
          setIsRegister(false); // Switch to login form after registration
        } else {
          setError(response.data.message || 'Registration failed');
        }
      } else {
        // Login request
        const response = await axios.post('http://localhost:5000/api/auth/login', formData);
        if (response.data.user) {
          const username = response.data.user.username;
          navigate(`/dashboard/${username}`); // Redirect to dynamic dashboard route
          alert("Login Successful");
        } else {
          setError('Invalid login credentials');
        }
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data?.message || 'An error occurred');
      } else if (error.request) {
        setError('Server is not responding. Please try again later.');
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen animated-background bg-pink-300">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-center text-2xl text-gray-300 mb-6">
          {isRegister ? 'Register' : 'Login'}
        </h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            {isRegister ? 'Register' : 'Login'}
          </button>
        </form>
        <div className="text-center text-gray-400 mt-4">
          <button
            type="button"
            onClick={toggleForm}
            className="text-blue-400 hover:underline"
          >
            {isRegister ? 'Already have an account? Login' : "Don't have an account? Register"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
