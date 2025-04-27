import React, { useEffect, useRef, useState } from 'react'
import './addAddressPopUp.css'
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../../../firebase/firebaseConfig';
import { v4 as uuidv4 } from 'uuid';

function AddAddressPopUp({ setAddPop, addPop }) {

    const [street, setStreet] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zipCode, setZipCode] = useState('');

    const addUserAddress = async () => {

        const userId = window.localStorage.getItem('userId');

        try {
            if (!userId) {
                console.error("User ID cannot be empty.");
                return false;
            }

            const userAddressRef = doc(db, 'users', userId, 'address', uuidv4());

            await setDoc(userAddressRef, {
                street: street,
                city: city,
                state: state,
                zipCode: zipCode
            })
            .then(()=>{
                setAddPop(false)
            })
            console.log("Address data added/updated successfully for user:", userId);
            return true;

            // Option 2: To merge the new address data with existing data (if any)
            // await updateDoc(userAddressRef, addressData, { merge: true });
            // console.log("Address data merged successfully for user:", userId);
            // return true;

        } catch (error) {
            console.error("Error adding/updating address data:", error);
            return false;
        }
    };

    const cardRef = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setAddPop(false);
            }
        };
        if (addPop) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [addPop]);

    return (
        <div className='add-address-container' >
            <div className='add-address-card' ref={cardRef} >
                <div className='close-btn' onClick={() => setAddPop(false)} >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x-icon lucide-x"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                </div>
                <div className='header-img' >
                    <img src='../../../../assets/images/map-icon.png' />
                    <h4>New Address</h4>
                </div>
                <input
                    type="text"
                    placeholder="Street Address (House Number)"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="City"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="State"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="ZIP code"
                    value={zipCode}
                    onChange={(e) => setZipCode(e.target.value)}
                />
                <input type='text' value='India' />
                <button onClick={addUserAddress}>Add</button>
            </div>
        </div>
    )
}

export default AddAddressPopUp