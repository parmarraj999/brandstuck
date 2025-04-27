import React, { useContext, useEffect, useState } from 'react'
import './profile.css';
import { useNavigate } from 'react-router-dom';
import { UserCredentialContext } from '../../context/userCredentialProvider';
import AddAddressPopUp from './addAddressPopUp/addAddressPopUp';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/firebaseConfig';
import OrderHistory from './orderHistory/orderHistory';

function Profile() {

  const userId = window.localStorage.getItem('userId');

  const [addPop, setAddPop] = useState(false)
  const [loading, setLoading] = useState(false)

  const [tab, setTab] = useState('info')

  const navigate = useNavigate();
  const { userCredential, userAddress, setUserAddress } = useContext(UserCredentialContext)
  console.log(userCredential)

  const handleDeleteAddress = async (addressId) => {
    try {
      setLoading(true); // Set loading state while deleting
      const addressDocRef = doc(db, 'users', userId, 'address', addressId);
      await deleteDoc(addressDocRef);
      // Update the state to remove the deleted address
      setUserAddress(prevAddresses => prevAddresses.filter(address => address.id !== addressId));
      console.log('Address deleted successfully:', addressId);
    } catch (error) {
      console.error('Error deleting address:', error);
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const handleLogOut = () => {
    window.localStorage.removeItem('userId')
    window.localStorage.setItem('isLogIn', false)
    console.log('log Out')
  }

  const isLogIn = window.localStorage.getItem('isLogIn')
  useEffect(() => {
    if (!isLogIn) {
      navigate('/')
    }
  }, [isLogIn])

  return (
    <div className='profile-container' >
      {
        addPop ?
          <AddAddressPopUp setAddPop={setAddPop} addPop={addPop} />
          : ''
      }

      <>
        <div className='profile-header' >
          <div className='back-btn' onClick={() => navigate('/')}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
          </div>
          <h2>Account</h2>
          <button onClick={handleLogOut}>Log Out</button>
        </div>
        <div className='profile-wrapper' >
          <div className='profile-sidenav' >
            <div onClick={() => setTab('info')} style={tab === 'info' ? { borderBottom: "1px solid black" } : {}}>my Information</div>
            <div onClick={() => setTab('history')} style={tab === 'history' ? { borderBottom: "1px solid black" } : {}}>order history</div>
          </div>
          <div className='line' ></div>
          <div className='profile-outlet' >
            {
              tab === 'info' ?
                <>
                  <div className='profile-main' >
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div className='section' >
                        <h2>NAME</h2>
                        <h3>{userCredential?.name}</h3>
                      </div>
                      <div className='section' >
                        <h2>email</h2>
                        <h3>{userCredential?.email}</h3>
                      </div>
                      <div className='section' >
                        <h2>number</h2>
                        <h3>{userCredential?.number}</h3>
                      </div>
                    </div>
                    <h2>Address</h2>
                    <div className='address-container'  >
                      {
                        userAddress.length === 3 ?
                          ''
                          :
                          <div className='address-box add-box' onClick={() => setAddPop(true)} >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin-plus-inside-icon lucide-map-pin-plus-inside"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><path d="M12 7v6" /><path d="M9 10h6" /></svg>
                            <h4>Add New Address</h4>
                          </div>
                      }
                      {
                        userAddress.map((data) => {
                          return (
                            <div className='address-box' >
                              <h5>{data.street},</h5>
                              <h5>{data.city},</h5>
                              <h5>{data.state},</h5>
                              <h5>{data.zipCode},</h5>
                              <div className='btns' >
                                <div>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pencil-icon lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                                </div>
                                <div onClick={() => handleDeleteAddress(data.id)}>
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" color='red' stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trash-icon lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
                                </div>
                              </div>
                            </div>
                          )
                        })
                      }
                    </div>
                  </div>
                </>
                : <OrderHistory />
            }

          </div>
        </div>
      </>

    </div>
  )
}

export default Profile