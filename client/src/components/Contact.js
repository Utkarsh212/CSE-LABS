import React, { useState } from 'react'
import { useOutletContext } from 'react-router-dom';

function Contact() {
    const [currentUser, getCurrentUser] = useOutletContext();
    const [formData, setFormData] = useState({
        name: currentUser.name,
        email: currentUser.email,
        subject: "",
        description: ""
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        })
        )
    };

    const handleSignup = (event) => {
        event.preventDefault();
        setFormData({
            name: currentUser.name,
            email: currentUser.email,
            subject: "",
            description: ""
        })
    }

    return (
        <div className="py-24 bg-gray-100 h-[88vh]">
            <div className="max-w-xs p-6 m-auto space-y-4 bg-white rounded shadow-xl sm:max-w-lg">
            <h1 className="text-3xl pt-5 text-center font-semibold font-sans">Contact</h1>
                <form onSubmit={handleSignup} className='space-y-5'>
                    <div className='space-y-5 flex flex-col justify-between sm:space-y-0 sm:flex-row'>
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
                    </div>
                    <div>
                            <label
                                htmlFor="subject"
                                className="block text-sm font-medium text-gray-700 undefined"
                            >
                                Subject
                            </label>
                            <input
                                type="text"
                                name="subject"
                                value={formData.subject}
                                onChange={handleChange}
                                autoComplete="off"
                                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                            />
                        </div>
                    <div>
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 undefined"
                        >
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
                        />
                    </div>
                    <div className="flex items-center mt-4">
                        <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Contact
