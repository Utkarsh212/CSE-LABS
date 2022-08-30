import React, { useEffect } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Home() {
  const [currentUser, getCurrentUser] = useOutletContext();
  const navigate = useNavigate();
  const redirectTo = () => {
    if (currentUser.signedIn) {
      navigate('/labs');
    } else {
      navigate('/signin')
    }
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <div className='flex flex-col items-center space-y-10 animate-fadeIn'>
      <h1 className="text-3xl pt-32 text-center font-semibold font-sans md:text-4xl lg:text-5xl">Welcome <span className='text-blue-500'>{currentUser.name}</span><br /> To Control System &amp; Engineering Labs</h1>
      <p className='text-center mx-5 md:max-w-3xl'>Control systems are everywhere, from the tiniest dial functioning inside your watch to the gigantic satellite revolving around the planet. They constantly synchronise the behaviour of devices in a recurrent and predicted way.</p>
      <button onClick={redirectTo} className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:bg-blue-700 focus-outline:none active:bg-blue-800 transition duration-150 ease-in-out">Get Started</button>
    </div>
  )
}

export default Home
