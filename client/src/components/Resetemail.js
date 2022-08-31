import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Resetemail() {
    const [currentUser, getCurrentUser] = useOutletContext();
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const handleClick = async (event) => {
        event.preventDefault();
        try {
            const res = await fetch('/password-reset', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email })
            });
            const data = await res.json();
            if (res.status !== 200 || !data) {
                window.alert(data.message);
            } else {
                window.alert(data.message);
                setEmail('')
            }
        } catch (err) {
            window.alert(err.message);
        }
    }
    return (
        <div className='py-24 bg-gray-100 h-[88vh]'>
            {currentUser.signedIn ? navigate('/') : <div className='flex flex-col justify-center items-center max-w-xs bg-white p-6 m-auto rounded shadow-xl sm:max-w-lg'>
                <h1 className="text-3xl pt-5 text-center font-semibold font-sans">Reset Password</h1>
                <p className='text-lg mt-4'>Please Enter Email on which reset link is to be sent</p>
                    <form onSubmit={handleClick} method="POST" className='w-3/4 flex flex-col justify-center items-end'>
                        <input
                            type="email"
                            name="email"
                            placeholder='Email'
                            onChange={(event) => { setEmail(event.target.value) }}
                            value={email}
                            autoComplete="off"
                            className="block w-full px-4 py-2 mt-4 m-auto bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none" />
                        <button
                            className="mt-4 w-1/3 min-w-fit px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                            Send
                        </button>
                    </form>
            </div>}
        </div>
    )
}

export default Resetemail
