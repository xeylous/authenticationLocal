'use client';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';

const Dashboard = () => {

    const [user] = useState(null);

    const navigate = useNavigate();

    // Fetch username on component mount
    

    // Sample logout handler
    const handleLogout = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/auth/logout`, { withCredentials: true });
            alert(response.data.alert);
            navigate('/'); // Redirect to the home page after logging out
        } catch (error) {
            console.error('Logout failed', error);
        }
    };

   

    return (
        <div className="min-h-screen bg-gray-800 flex flex-col justify-center items-center text-gray-300">
            <div className="flex flex-col items-center mb-6">
                <h1 className="text-3xl">Welcome to Your Dashboard</h1>
                {user && (
                    <>
                        <h2 className='text-xl text-white mt-2'>Hi {user.name}!</h2>
                        <button
                            className="mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                        >
                            Go to Profile
                        </button>
                    </>
                )}
            </div>
            <p className="text-lg mb-6">This is your personal dashboard where you can view and manage your account information.</p>

            <div className="flex justify-center">
                <button
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Dashboard;
