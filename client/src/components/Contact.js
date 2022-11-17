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
        <div className="py-24 h-[max(88vh, fit-content)]">
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
                <hr />
                <div className="text-center mt-4 text-grey-600">
                    <a href="https://github.com/Utkarsh212/CSE-Labs" target="_blank" rel="noreferrer" >
                        <svg aria-hidden="true" className="octicon octicon-mark-github m-auto" height="24" version="1.1" viewBox="0 0 16 16" width="24">
                            <path fillRule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0 0 16 8c0-4.42-3.58-8-8-8z"></path>
                        </svg>
                    </a>
                    If you find an Issue in the project and want to contribute. Feel free to create an Issue&nbsp;
                    <span>
                        <a className="text-blue-600 hover:underline" href="https://github.com/Utkarsh212/CSE-Labs/issues/new" target="_blank" rel="noreferrer">
                            Here
                        </a>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default Contact
