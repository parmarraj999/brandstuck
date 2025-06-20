import React, { useContext, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import './addAddress.css';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../../../firebase/firebaseConfig';
import { UserCredentialContext } from '../../../../context/userCredentialProvider';

const AddAddressPage = ({setShowAddress}) => {

  const {fetchUserAddresses} = useContext(UserCredentialContext)

  const [formData, setFormData] = useState({
    pincode: '',
    state: '',
    city: '',
    houseDetails: '',
    roadDetails: '',
    addressType: 'Home'
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.houseDetails.trim()) newErrors.houseDetails = 'House details are required';
   
    if (formData.pincode && !/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const userId = window.localStorage.getItem('userId')

  const handleSubmit = async() => {
    if (validateForm()) {
      console.log('Form Data:', formData);
      
       const addressRef = collection(db, "users", userId, "address");

    // add address document
    const docRef = await addDoc(addressRef, formData);

    console.log("Address added with ID: ", docRef.id);
      
      setTimeout(() => {
        alert('Address saved successfully!');
        setFormData({
          pincode: '',
          state: '',
          city: '',
          houseDetails: '',
          roadDetails: '',
          addressType: 'Home'
        });
        setShowAddress(false)
        fetchUserAddresses();
      }, 500);
    }
  };

  const handleBack = () => {
    setShowAddress(false);
    // In a real app, you would use React Router navigation here
  };

  return (
    <div className="address-form-container">
      <div className="form-card">
        {/* Header */}
        <div className="header">
          <button onClick={handleBack} className="back-button">
            <ArrowLeft size={20} className="back-icon" />
          </button>
          <h1 className="title">Add New Address</h1>
        </div>

        {/* Form */}
        <div className="form-container">
          {/* Pincode */}
          <div className="input-group">
            <label className="label">Pincode</label>
            <input
              type="number"
              name="pincode"
              value={formData.pincode}
              onChange={handleInputChange}
              placeholder="Enter pincode"
              className={`input ${errors.pincode ? 'input-error' : ''}`}
            />
            {errors.pincode && (
              <p className="error-text">{errors.pincode}</p>
            )}
          </div>

          {/* State */}
          <div className="input-group">
            <label className="label">State</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleInputChange}
              placeholder="Enter state"
              className={`input ${errors.state ? 'input-error' : ''}`}
            />
            {errors.state && (
              <p className="error-text">{errors.state}</p>
            )}
          </div>

          {/* City */}
          <div className="input-group">
            <label className="label">City</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
              placeholder="Enter city"
              className={`input ${errors.city ? 'input-error' : ''}`}
            />
            {errors.city && (
              <p className="error-text">{errors.city}</p>
            )}
          </div>

          {/* House Details */}
          <div className="input-group">
            <label className="label">House No., Building Name</label>
            <input
              type="text"
              name="houseDetails"
              value={formData.houseDetails}
              onChange={handleInputChange}
              placeholder="Enter house no., building name"
              className={`input ${errors.houseDetails ? 'input-error' : ''}`}
            />
            {errors.houseDetails && (
              <p className="error-text">{errors.houseDetails}</p>
            )}
          </div>

          {/* Road Details */}
          <div className="input-group">
            <label className="label">Road Name, Area, Colony</label>
            <input
              type="text"
              name="roadDetails"
              value={formData.roadDetails}
              onChange={handleInputChange}
              placeholder="Enter road name, area, colony"
              className={`input ${errors.roadDetails ? 'input-error' : ''}`}
            />
            {errors.roadDetails && (
              <p className="error-text">{errors.roadDetails}</p>
            )}
          </div>

          {/* Address Type */}
          <div className="input-group">
            <label className="label">Address Type</label>
            <div className="radio-group">
              {['Home', 'Work', 'Other'].map((type) => (
                <label key={type} className="radio-label">
                  <input
                    type="radio"
                    name="addressType"
                    value={type}
                    checked={formData.addressType === type}
                    onChange={handleInputChange}
                    className="radio-input"
                  />
                  <span className="radio-text">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Save Button */}
          <button
            type="button"
            onClick={handleSubmit}
            className="save-button"
          >
            Save Address
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddAddressPage;