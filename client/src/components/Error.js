import React from 'react'
import { useNavigate } from 'react-router-dom'
function Error() {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center space-y-10 animate-fadeIn relative'>
      <h1 className='absolute text-[9rem] md:text-[15rem] text-gray-200 font-extrabold top-[15%] -z-10'>404</h1>
      <h1 className="text-3xl pt-32 text-center font-semibold font-sans md:text-4xl lg:text-5xl">Oops! PAGE NOT FOUND</h1>
      <p className='text-center mx-5 md:max-w-3xl'>The page you are looking for might be removed or does not exist</p>
      <button
        onClick={() => {navigate("/")}}
        className="inline-block px-4 py-2 text-white bg-blue-600 rounded-md shadow hover:bg-blue-700 focus:bg-blue-700 focus-outline:none active:bg-blue-800 transition duration-150 ease-in-out">Home</button>
    </div>
  )
}

export default Error
