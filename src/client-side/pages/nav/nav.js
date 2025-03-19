import React, { useContext } from 'react';
import './nav.css';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../../context/ThemeContext';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Nav() {

    const { theme, toggleTheme } = useContext(ThemeContext)

    useGSAP(() => {
        gsap.to('.nav_container', {
         y: -20,
            scrollTrigger: {
                trigger:'.nav_container',
                start: 'top 1%',
                end: 'top -1%',
                scrub: true,
            },
        });
    })

    return (
        <div className='nav_container' >
            <div className='nav_links' >
                <button onClick={toggleTheme}>Toggle Theme</button>
                <Link className='nav_link'>Shop</Link>
                <Link className='nav_link'>Brands</Link>
                <Link className='nav_link'>Accessories</Link>
                <Link className='nav_link'>Shoes</Link>
            </div>
            <div className='nav_logo'>
                <img src='../../../../../assets/images/logo.png' />
            </div>
            <div className='nav_buttons'>
                <div className='nav_button'>
                    <svg style={{ width: '30px', height: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"></path></svg>
                </div>
                <div className='nav_button'>
                    <svg style={{ width: '30px', height: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M9 6H15C15 4.34315 13.6569 3 12 3C10.3431 3 9 4.34315 9 6ZM7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6H20C20.5523 6 21 6.44772 21 7V21C21 21.5523 20.5523 22 20 22H4C3.44772 22 3 21.5523 3 21V7C3 6.44772 3.44772 6 4 6H7ZM5 8V20H19V8H5ZM9 10C9 11.6569 10.3431 13 12 13C13.6569 13 15 11.6569 15 10H17C17 12.7614 14.7614 15 12 15C9.23858 15 7 12.7614 7 10H9Z"></path></svg>
                </div>
                <div className='nav_button'>
                    <svg style={{ width: '30px', height: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path></svg>
                </div>
            </div>
        </div >
    )
}

export default Nav