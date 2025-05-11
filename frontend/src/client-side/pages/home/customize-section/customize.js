import React from 'react';
import './customize.css';
import { Link } from 'react-router-dom';

function Customize() {
    return (
        <div className='customize-container' >
            <img src='../../../../assets/images/customise-banner.png' className='desktop'/>
            <img src='../../../../assets/images/customise-mobile.png' className='mobile'/>
            <Link className='custome-btn' >
                <div>
                    Customize Your
                </div>
                <div style={{ padding: "0 .8rem", background: 'transparent' }} >
                    <svg style={{ width: "25px", height: "25px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>
                </div>
            </Link>
        </div>
    )
}

export default Customize