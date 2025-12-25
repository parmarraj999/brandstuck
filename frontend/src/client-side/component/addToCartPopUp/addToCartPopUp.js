import React, { useContext, useEffect, useState } from 'react'
import './addToCartPopUp.css'
import { cartDataContext } from '../../context/cartDataProvider';
import { useNavigate } from 'react-router-dom';

function AddToCartPopUp({ setCartPopUp, cartPopUp, data }) {

    const [top, setTop] = useState(0);

    const { addToCart } = useContext(cartDataContext)

    useEffect(() => {
        if (cartPopUp) {
            setTop(window.scrollY);
        }
    }, [cartPopUp]);

    const userId = window.localStorage.getItem("userId");
    const navigate = useNavigate();

    const handleAddToCart = () => {
        if(!userId) {   
            alert("Please login to add items to cart");
            navigate('/auth');
            return;
        }
        addToCart(data)
        setCartPopUp(false)
    }

    if (!cartPopUp) return null;
    return (
        <div className='cart-pop-container' style={{
            position: "absolute",
            top: `${top}px`,
            left: "50%",
            transform: "translateX(-50%)",
        }} >
            <div className='cart-pop-wrapper' >
                <div className='close-btn' onClick={() => {
                    setCartPopUp(false)
                    document.body.style.overflow = 'auto'
                }}>
                    <svg style={{ width: '25px', color: 'white' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                </div>
                <div className='image-container' >
                    <img src={data.imageUrls[0].imageUrl} />
                </div>
                <div className='product-detail' >

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        <h2>{data.name}</h2>
                        <h3>rs.{data.discountPrice}</h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        <h4>Available size</h4>
                        <h5>[size chart]</h5>
                    </div>

                    <div className='size-container' >
                        {
                            data.sizes.map((sizeData) => {
                                return (
                                    <div  >
                                        {sizeData}
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className='addBtn' onClick={handleAddToCart}>Add to cart</button>
                </div>
            </div>
        </div>
    )
}

export default AddToCartPopUp