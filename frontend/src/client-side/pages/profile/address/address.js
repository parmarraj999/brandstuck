import React from 'react';
import './address.css'
import { useNavigate } from 'react-router-dom';

export default function AddressPage() {
  const addresses = [
    {
      id: 1,
      type: 'Main Address',
      streetAddress: '374/3 Saket Nagar,',
      cityState: 'Bhopal, Madhya Pradesh',
      zipCode: '482024'
    },
    {
      id: 2,
      type: 'Office Address',
      streetAddress: 'Mariyus Colony, Station ganj,',
      cityState: 'Narsinghpur, Madhya Pradesh',
      zipCode: '482024'
    }
  ];

  const handleAddNewAddress = () => {
    console.log('Add new address clicked');
  };

  const handleEditAddress = (id) => {
    console.log('Edit address', id);
  };

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/profile')
  }

  return (
    <div className='address-container' >

      <div className='back-btn' onClick={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
        Back
      </div>
      <div className="addressPage">

        <h1>ADDRESS</h1>
        <div className="divider"></div>

        {addresses.map(address => (
          <div key={address.id} className="addressCard">
            <div className="addressType">{address.type}</div>
            <div className="addressLine">{address.streetAddress}</div>
            <div className="addressLine">{address.cityState}</div>
            <div className="addressLine">{address.zipCode}</div>
            <div
              className="editButton"
              onClick={() => handleEditAddress(address.id)}
            >
              <svg className="editIcon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </div>
          </div>
        ))}

        <div
          className="newAddressButton"
          onClick={handleAddNewAddress}
        >
          New Address
        </div>
      </div>
    </div>
  );
}