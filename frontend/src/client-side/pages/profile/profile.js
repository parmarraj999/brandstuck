import React, { useState } from 'react'
import './profile.css';
import { Link, useNavigate } from 'react-router-dom';

function Profile() {

    const navigate = useNavigate();
    const handleBack = () => {
        navigate('/shop')
    }

    return (
        <div className='profile-container' >
            <div className='back-btn' onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                Back
            </div>
            <div className='log-out-btn' >
                Log Out
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-log-out-icon lucide-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" x2="9" y1="12" y2="12" /></svg>
            </div>
            <div className="profileSelector">
                <h1>Account</h1>

                <img className='avatar' src='../../../../assets/images/profile-avatar.gif' />
                <div className="profileLabel">Brandstuck Member<br /></div>
                <div className='option-list' >
                    <Link to='/profile/information' className='profileOption'>
                        <div className="profileName">My Information</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                    <div className='profileOption'>
                        <div className="profileName">My Wallet</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </div>
                    <Link to='/profile/address' className='profileOption'>
                        <div className="profileName">Address</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                    <Link to='/profile/orders' className='profileOption'>
                        <div className="profileName">Your Orders</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </Link>
                    <div className='profileOption'>
                        <div className="profileName">Payment History</div>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile