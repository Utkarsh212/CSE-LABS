import { useState } from 'react'
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { ReactComponent as Logo } from '../cse.svg';

function Navbar({ signedInfo, setSignedInfo }) {
    const location = useLocation().pathname.split('/');
    const [navbar, setNavbar] = useState(false);
    const navigate = useNavigate();
    const afterSignout = async () => {
        try {
            const res = await fetch('/signout', {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            const data = await res.json();
            if (res.status !== 200 || !data) {
                window.alert(data.message);
                throw new Error();
            } else {
                setSignedInfo({
                    name: "",
                    email: "",
                    signedIn: false,
                    admin: false
                });
                navigate("/");
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <nav className="w-full bg-white md:h-[12vh]">
            <div className="p-8 justify-between mx-auto md:flex md:items-center md:pt-7 md:pb-5 md:pl-16 md:pr-16">
                <div>
                    <div className="flex items-center justify-between md:block">
                        <NavLink to="/">
                            <Logo className="w-8 md:w-10" />
                        </NavLink>
                        <div className="md:hidden">
                            <button
                                className="p-[0.2rem] text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-gray-400"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${navbar ? "block" : "hidden"
                            }`}
                    >
                        <ul className="text-black text-md items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0">
                            <li className={`${location[1] === "" ? 'text-blue-500' : ''}`}>
                                <NavLink to="/">Home</NavLink>
                            </li>
                            <li className={`${location[1] === "about" ? 'text-blue-500' : ''}`}>
                                <NavLink to="/about">About Us</NavLink>
                            </li>
                            <li className={`${location[1] === "labs" ? 'text-blue-500' : ''}`}>
                                <NavLink to="/labs">Resources</NavLink>
                            </li>
                            <li className={`${location[1] === "contact" ? 'text-blue-500' : ''}`}>
                                <NavLink to="/contact">Contact Us</NavLink>
                            </li>
                        </ul>
                        {
                            signedInfo.signedIn ?
                                <div onClick={afterSignout} className="mt-3 md:hidden">
                                    <div
                                        className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 cursor-pointer "
                                    >
                                        Sign Out
                                    </div>
                                </div>
                                :
                                <div className="mt-3 space-y-2 md:hidden">
                                    <NavLink
                                        to="/signin"
                                        className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                                    >
                                        Sign in
                                    </NavLink>
                                    <NavLink
                                        to="/signup"
                                        className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                                    >
                                        Sign up
                                    </NavLink>
                                </div>
                        }
                    </div>
                </div>

                {
                    signedInfo.signedIn ?
                        <div onClick={afterSignout}>
                            <div
                                className="hidden px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800 cursor-pointer md:inline-block"
                            >
                                Sign Out
                            </div>
                        </div>
                        :
                        <div className="hidden space-x-2 md:inline-block">
                            <NavLink
                                to="/signin"
                                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                            >
                                Sign in
                            </NavLink>
                            <NavLink
                                to="/signup"
                                className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                            >
                                Sign up
                            </NavLink>
                        </div>
                }
            </div>
        </nav>
    )
}

export default Navbar