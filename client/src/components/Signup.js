import React, { useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

function Signup() {
    const [currentUser, getCurrentUser] = useOutletContext();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        cpassword: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        })
        )
    };

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const { name, email, phone, password, cpassword } = formData;
            const res = await fetch('/signup', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, phone, password, cpassword })
            });
            const data = await res.json();
            if (res.status !== 200 || !data) {
                toast.error(data.message);
            } else {
                toast.success("Registration Successfull");
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    password: "",
                    cpassword: ""
                })
                navigate('/signin');
            }
        } catch (err) {
            toast.error('User Registration Failed. Please Try Again!!')
        }
    }

    return (
        <div className="py-10 min-h-[88vh]">
            {currentUser.signedIn ? navigate('/') : <div className="max-w-xs p-6 m-auto space-y-5 bg-white rounded shadow-xl sm:max-w-md">
                <h1 className="text-3xl pt-5 text-center font-semibold font-sans">Sign Up</h1>
                <form onSubmit={handleSignup} className="space-y-4">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Phone
                        </label>
                        <input
                            type="number"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <label
                            htmlFor="cpassword"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="cpassword"
                            value={formData.cpassword}
                            onChange={handleChange}
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                        />
                    </div>
                    <div>
                        <h3 className="block text-md font-medium text-gray-700 undefined">Password Policy</h3>
                        <ul>
                            <li className='text-sm'>Password must contain minimum 8 Characters.</li>
                            <li className='text-sm'>There must be atleast 1 Uppercase, 1 Lowercase, 1 Numeric and 1 Special Character.</li>
                        </ul>
                    </div>
                    <div className="flex items-center mt-4">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Register
                        </button>
                    </div>
                </form>
                <div className="text-center mt-4 text-grey-600">
                    Already have an account?{" "}
                    <span>
                        <Link className="text-blue-600 hover:underline" to="/signin">
                            Sign in
                        </Link>
                    </span>
                </div>
            </div>}
            <Toaster />
        </div>
    )
}

export default Signup
