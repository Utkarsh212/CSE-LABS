import React from 'react'
import './App.css';
import {
  Routes,
  Route,
} from "react-router-dom";
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import About from './components/About';
import Layout from './components/Layout';
import Labs from './components/Labs';
import Contact from './components/Contact';
import Error from './components/Error'
import Resetemail from './components/Resetemail';
import Passwordreset from './components/Passwordreset';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="labs" element={<Labs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="signup" element={<Signup />} />
          <Route path="signin" element={<Signin />} />
          <Route path="password-reset" element={<Resetemail />} />
          <Route path="password-reset/:userId/:token" element={<Passwordreset />} />
          <Route path="/*" element={<Error />} />
      </Route>
    </Routes>
  );
}

export default App;
