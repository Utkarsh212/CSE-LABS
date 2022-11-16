import React from 'react'

function Card({ title, creator, link, _id, getLabs, admin, manualLink }) {
  const removeLab = async () => {
    const res = await fetch('/labs', {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ _id })
    })

    const data = await res.json();
    if (res.status !== 200 || !data) {
      window.alert(data.message);
    } else {
      window.alert("Lab Removed Successfully");
      getLabs();
    }
  }
  return (
    <div className="w-full max-w-sm m-auto px-2 py-3 rounded-lg shadow-md bg-white">
      {admin && <div
        onClick={removeLab}
        className="float-right w-5 h-5 rounded-xl cursor-pointer hover:bg-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-gray-500 p-0.5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
          <title>Remove Lab</title>
        </svg>
      </div>}
      <div className="p-4">
        <h5 title={title} className="text-gray-900 text-xl leading-tight font-medium mb-2 text-ellipsis whitespace-nowrap overflow-hidden">
          {title}
        </h5>
        <p className="text-gray-700 text-base mb-4">
          {`Created By: ${creator}`}
        </p>
        <div className='flex justify-start items-center space-x-5'>
          <a href={link} target="_blank" rel="noreferrer">
            <button
              className=" inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              START LAB
            </button>
          </a>
          <a href={manualLink} target="_blank" rel="noreferrer">
            <button
              className=" inline-block px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              MANUAL
            </button>
          </a>
        </div>
      </div>
    </div>
  )
}

export default Card
