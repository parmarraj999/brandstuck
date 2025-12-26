import React, { useContext, useEffect, useState } from 'react';
import './address.css'
import { Link, useNavigate } from 'react-router-dom';
import AddAddressPage from './addAddress/addAddress';
import { UserCredentialContext } from '../../../context/userCredentialProvider';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';

export default function AddressPage() {

  const { userAddress, fetchUserAddresses } = useContext(UserCredentialContext)
  const userId = localStorage.getItem('userId');
  console.log(userAddress)

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
    setShowAddress(true);
  };

  const deleteAddress = async (id) => {
    console.log('Edit address', id);
    const addressDocRef = doc(db, "users", userId, "address", id);
    await deleteDoc(addressDocRef)
      .then(() => {
        console.log('Address deleted successfully');
        fetchUserAddresses();
      })
  }

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1)
  }

  const [showAddress, setShowAddress] = useState(false);

  useEffect(()=>{
    fetchUserAddresses();
  },[])

  return (
    <div className='address-container' >

      {
        showAddress ?
          <AddAddressPage setShowAddress={setShowAddress} />
          : ""
      }

      <div className='back-btn' onClick={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
        Back
      </div>
      <div className="addressPage">

        <h1>ADDRESS</h1>
        <div className="divider"></div>

        {userAddress.map(address => (
          <div key={address.id} className="addressCard">
            <div className="addressType">{address.addressType}</div>
            <div className="addressLine">{address.houseDetails}</div>
            <div className="addressLine">{address.city} , {address.state}</div>
            <div className="addressLine">{address.pincode}</div>
            <div
              className="editButton"
              onClick={() => deleteAddress(address.id)}
            >
              <svg style={{ width: "20px", color: "red" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
            </div>
          </div>
        ))}

        <div className="newAddressButton" onClick={handleAddNewAddress}>
          New Address
        </div>
      </div>
    </div>
  );
}