import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useOutletContext } from 'react-router-dom';

function Signin() {
    const [currentUser, getCurrentUser] = useOutletContext();
    const navigate = useNavigate();
    const [loginCredentials, setLoginCredentials] = useState({
        email: "",
        password: ""
    });

    const handleChange = (event) => {
        const { name, value} = event.target;
        setLoginCredentials(prev => ({
            ...prev,
            [name]: value
        })
    )};

    const handleSignin = async (event) => {
        event.preventDefault();
        const { email, password } = loginCredentials;
        const res = await fetch("/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify ({ email, password })
        });

        const data = await res.json();
        if(res.status !== 200 || !data) {
            window.alert(data.message);
        } else {
            setLoginCredentials({
                email: "",
                password: ""
            });
            getCurrentUser();
            navigate("/")
        }
    };
    
    return (
        <div className="bg-gray-100 h-[88vh] py-24">
            {currentUser.signedIn ? navigate("/") : <div className="max-w-sm p-6 m-auto bg-white rounded shadow-xl sm:max-w-md">
            <h1 className="text-3xl pt-5 text-center font-semibold font-sans">Sign-in</h1>
                <form className="mt-6" onSubmit={handleSignin}>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email</label>
                        <input 
                            type="email"
                            name="email"
                            onChange={handleChange}
                            value={loginCredentials.email}
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none" />
                    </div>
                    <div className="mt-4">
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-800">Password</label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                value={loginCredentials.password}
                                autoComplete="off"
                                className="block w-full px-4 py-2 mt-2 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none" />
                        </div>
                        <p className="mt-2 font-medium text-sm text-blue-500 hover:underline"><Link to="/password-reset">Forget Password?</Link></p>
                        <div className="mt-6">
                            <button
                                className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                                Sign In
                            </button>
                        </div>
                    </div>
                </form>
                <p className="mt-8 text-center text-gray-700"> Don't have an account? <Link to="/signup"
                    className="font-medium text-blue-500 hover:underline">Sign up</Link></p>
            </div>}
        </div>
    )
}

export default Signin
