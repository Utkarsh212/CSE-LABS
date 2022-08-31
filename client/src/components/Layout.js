import React, {useState, useEffect} from 'react';
import { Outlet } from "react-router-dom";
import Navbar from './Navbar';

function Layout() {
  const [currentUser, setCurrentUser] = useState({
    name: "",
    email: "",
    signedIn: false,
    admin: false
  })

  const getCurrentUser = async () => {
    try {
      const res = await fetch('/userinfo', {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Accept" : "application/json"
        },
        credentials: "include"
      });

      const data = await res.json()

      if (res.status !== 200 || !data) {
        const error = new Error(res.error);
        throw error;
      } else {
        const { name, email, admin } = data.userInfo;
        setCurrentUser({name, email, admin, signedIn: true});
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const setUserInfo = (data) => {
    setCurrentUser(data);
  }

  return (
    <div>
      <Navbar signedInfo={currentUser} setSignedInfo={setUserInfo} />
      <div>
        <Outlet context={[currentUser, getCurrentUser]}/>
      </div>
    </div>
  )
}

export default Layout
