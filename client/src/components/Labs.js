import React, { useEffect, useState } from 'react'
import { useOutletContext } from 'react-router-dom';
import Card from './Card'

function Labs() {
  const [currentUser, getCurrentUser] = useOutletContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [display, setDisplay] = useState(true);
  const [addLabData, setAddLabData] = useState({
    title: "",
    creator: "",
    link: ""
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setAddLabData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLabAddition = async (event) => {
    event.preventDefault();
    try {
      const { title, creator, link } = addLabData;
      const res = await fetch('/labs', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, creator, link })
      })

      const data = await res.json();
      if (res.status !== 200 || !data) {
        window.alert(data.message);
      } else {
        window.alert("Lab Added Successfully");
        setAddLabData({
          title: "",
          creator: "",
          link: ""
        })
        getLabs();
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const [labData, setLabData] = useState([]);
  const getLabs = async () => {
    try {
      const res = await fetch('/labs', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "Accept" : "application/json"
        }
      })
      const data = await res.json();
      if (res.status !== 200 || !data) {
        window.alert(data.message);
        throw new Error();
      } else {
        setLabData(data.labs)
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  useEffect(() => {
    getLabs();
  }, [])

  return (
    <div className="relative bg-gray-50 h-[88vh]">
      <div className="flex justify-evenly items-center px-5 pt-14 pb-5 md:justify-center">
          <input
            onChange={event => { setSearchTerm(event.target.value) }}
            type="text"
            className="block w-1/2 h-10 px-4 py-6 bg-white border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none md:max-w-md"
            placeholder="Search..."
          />
        {currentUser.admin && <button
          className="min-w-fit static h-10 top-16 right-20 px-4 py-2 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out md:absolute"
          onClick={() => setDisplay(!display)}
        >
          {display ? 'Add Lab' : 'Close'}
        </button>}
      </div>

      {currentUser.admin && <div className={`w-full max-w-sm p-6 mx-auto mb-5 rounded sm:p-3 sm:max-w-screen-xl ${display ? "hidden" : "block"}`}>
        <form onSubmit={handleLabAddition}>
          <div className="flex flex-col justify-between items-stretch m-auto md:flex-row md:items-end md:max-w-screen-md">
            <div className="sm:mt-4">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Title
              </label>
              <input
                type="text"
                name="title"
                value={addLabData.title}
                onChange={handleChange}
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="creator"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Creator
              </label>
              <input
                type="text"
                name="creator"
                value={addLabData.creator}
                onChange={handleChange}
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
              />
            </div>
            <div className="mt-4">
              <label
                htmlFor="link"
                className="block text-sm font-medium text-gray-700 undefined"
              >
                Link
              </label>
              <input
                type="text"
                name="link"
                value={addLabData.link}
                onChange={handleChange}
                autoComplete="off"
                className="block w-full px-4 py-2 mt-2 border border-gray-300 rounded-md focus:border-gray-500 focus:outline-none"
              />
            </div>
            <button
              className="px-4 py-2 mt-4 h-10 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
            >
              Add
            </button>
          </div>
        </form>
      </div>}
      <div className='grid grid-cols-1 gap-10 p-8 justify-evenly md:grid-cols-2 lg:grid-cols-3'>
        {labData.filter((val) => {
          if (searchTerm === '') {
            return val;
          } else if (val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
            return val;
          }
        }).map(lab => <Card key={lab._id} _id={lab._id} title={lab.title} creator={lab.creator} link={lab.link} getLabs={getLabs} admin={currentUser.admin} />)}
      </div>
    </div>
  )
}

export default Labs
