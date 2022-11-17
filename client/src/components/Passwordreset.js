import React, { useState } from 'react'
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom'
import toast, { Toaster } from 'react-hot-toast';

function Passwordreset() {
    const navigate = useNavigate();
    const [currentUser, getCurrentUser] = useOutletContext();
    const location = useLocation().pathname.split('/');
    const [formData, setFormData] = useState({
        newPassword: '',
        cNewPassword: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleReset = async (event) => {
        event.preventDefault();
        try {
            const { newPassword, cNewPassword } = formData;
            const res = await fetch(`/password-reset/${location[2]}/${location[3]}`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ newPassword, cNewPassword })
            });
            const data = await res.json();
            if (res.status !== 200 || !data) {
                toast.error(data.message);
            } else {
                window.alert(data.message);
                setFormData({
                    newPassword: '',
                    cNewPassword: ''
                })
                navigate('/signin')
            }
        } catch (err) {
            toast.error("Reset Password Failed. Please Try Again!!");
        }
    }

    return (
        <div className='py-24 h-[88vh]'>
            {currentUser.signedIn ? navigate('/') : <div className='flex flex-col justify-center items-center max-w-xs bg-white p-6 m-auto rounded shadow-xl sm:max-w-lg'>
                <h1 className="text-3xl pt-5 text-center font-semibold font-sans">Reset Password</h1>
                <p className='text-lg mt-4'>Please enter new password</p>
                    <form onSubmit={handleReset} className='w-3/4 m-auto flex flex-col justify-center items-end'>
                        <div className='w-full'>
                            <label
                                htmlFor="newPassword"
                                className="mt-4 block text-sm font-medium text-gray-700 undefined"
                            >
                                Password
                            </label>
                            <input
                                type="password"
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                autoComplete="off"
                                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                            />
                            <label
                                htmlFor="cNewPassword"
                                className="mt-4 block text-sm font-medium text-gray-700 undefined"
                            >
                                Confirm Password
                            </label>
                            <input
                                type="password"
                                name="cNewPassword"
                                value={formData.cNewPassword}
                                onChange={handleChange}
                                autoComplete="off"
                                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                            />
                            <div className='mt-2'>
                                <h3 className="block text-md font-medium text-gray-700 undefined">Password Policy</h3>
                                <ul>
                                    <li className='text-sm'>Password must contain minimum 8 Characters.</li>
                                    <li className='text-sm'>There must be atleast 1 Uppercase, 1 Lowercase, 1 Numeric and 1 Special Character.</li>
                                </ul>
                            </div>
                        </div>
                        <button
                            className="mt-4 w-1/3 min-w-fit px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Reset
                        </button>
                    </form>
            </div>}
            <Toaster />
        </div>
    )
}

export default Passwordreset
