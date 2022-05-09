import React, {useState} from 'react'
import logo from '../assets/images/logo.jpg'
import {AiOutlineClose, AiOutlineMenu} from 'react-icons/ai'
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";



const Navbar = () => {
    const [nav, setNav] = useState(false);

    const handleNav = () => {
      setNav(!nav);
    };
  return (
    <div className='flex justify-between items-center h-24 max-w[1240px] mx-auto px-4'>
        <img className='h-24' src={logo} alt="" />
        <ul className='hidden md:flex'>
        <li className='p-4'><Link to="/sign-in">Sign In/Register</Link></li>
        <li className='p-4'><Link to="/" >Home</Link></li>
        <li className='p-4'><Link to="/classes">Timetable</Link></li>
        <li className='p-4'><Link to="/special-occasions">Special Occasions</Link></li>
        <li className='p-4'><Link to="/bookings">Your Bookings</Link></li>
        <li className='p-4'><Link to="/contact">Contact Us</Link></li>
        <li className='p-4'><Link to="/settings">Settings</Link></li>
      </ul>
      <div onClick={handleNav} className='block md:hidden'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#fafafa] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <img className='h-24' src={logo} alt="" />
        <li className='p-4 border-b border-gray-600'><Link to="/sign-in">Sign In/Register</Link></li>
        <li className='p-4 border-b border-gray-600'><Link to="/" >Home</Link></li>
        <li className='p-4 border-b border-gray-600'><Link to="/classes">Timetable</Link></li>
        <li className='p-4 border-b border-gray-600'><Link to="/special-occasions">Special Occasions</Link></li>
        <li className='p-4 border-b border-gray-600'><Link to="/bookings">Your Bookings</Link></li>
        <li className='p-4 border-b border-gray-600'><Link to="/contact">Contact Us</Link></li>
        <li className='p-4'><Link to="/settings">Settings</Link></li>
      </ul>
    </div>
  )
}

export default Navbar