import React, { useContext, useState } from 'react';
import './information.css';
import { useNavigate } from 'react-router-dom';
import { UserCredentialContext } from '../../../context/userCredentialProvider';

export default function Information() {

  const {userCredential} = useContext(UserCredentialContext)

  const [formData, setFormData] = useState({
    name: 'Raj Parmar',
    email: 'developersucks@gmail.com',
    number: '8869959066',
    password: '••••••••••••'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    console.log('Form submitted:', formData);
    // Handle form submission logic here
  };

  const handleChangePassword = () => {
    // Logic to handle password change
    console.log('Change password clicked');
  };

  const navigate = useNavigate();
    const handleBack = () => {
        navigate('/profile')
    }

  return (
    <div className='inform-container' >
      <div className='back-btn' onClick={handleBack}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                Back
            </div>
    <div className="userInfoForm">

      <h1>MY INFORMATION</h1>
      <div className="divider"></div>

      <div>
        <div className="formGroup">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="number">Number</label>
          <input
            type="tel"
            id="number"
            name="number"
            value={formData.number}
            onChange={handleChange}
          />
        </div>

        <div className="formGroup">
          <label htmlFor="password">Password</label>
          <div className="passwordField">{formData.password}</div>
          <div className="changePasswordLink" onClick={handleChangePassword}>
            Change Password
          </div>
        </div>

        <div 
          className="updateButton"
          onClick={handleSubmit}
        >
          Update
        </div>
      </div>
      </div>
    </div>
  );
}