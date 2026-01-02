import React from 'react';
import {NavLink} from 'react-router-dom';

const LeftNav = () => {
    return (
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active-left-nav" : "")}>
                    <img src='./img/icons/home.svg' alt='Logo home'/>
                    </NavLink>
                    <br/>
                    <NavLink to="/trending" className={({ isActive }) => (isActive ? "active-left-nav" : "")}>
                    <img src='./img/icons/rocket.svg' alt='Logo fusée'/>
                    </NavLink>
                    <br/>
                    <NavLink to="/profil" className={({ isActive }) => (isActive ? "active-left-nav" : "")}>
                    <img src='./img/icons/user.svg' alt='Logo profil'/>
                    </NavLink>
                    <br/>
                </div>
            </div>
        </div>
)}

export default LeftNav