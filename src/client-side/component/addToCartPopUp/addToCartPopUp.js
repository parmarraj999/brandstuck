import React, { useEffect, useState } from 'react'
import './addToCartPopUp.css'

function AddToCartPopUp({ setCartPopUp, cartPopUp }) {

    const [top, setTop] = useState(0);

    useEffect(() => {
        if (cartPopUp) {
            setTop(window.scrollY);
        }
    }, [cartPopUp]);



    const [chooseSize, setChooseSize] = useState('');

    const size = [
        { text: 's' },
        { text: 'm' },
        { text: 'l' },
        { text: 'xl' },
        { text: 'xxl' },
    ]

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
                    <img src='https://www.urbanmonkey.com/cdn/shop/files/short-sleeve-half-zipper-shirt-black-um24-core-sh012-s-134059.jpg?v=1743040053' />
                </div>
                <div className='product-detail' >

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        <h2>Slim Fit Jeans</h2>
                        <h3>rs.1350</h3>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }} >
                        <h4>Choose size</h4>
                        <h5>[size chart]</h5>
                    </div>

                    <div className='size-container' >
                        {
                            size.map((data) => {
                                return (
                                    <div onClick={() => setChooseSize(data.text)} style={chooseSize === data.text ? { background: 'black', color: "white" } : {}} >
                                        {data.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                    {
                        chooseSize !== "" ?
                            <button className='addBtn'>Add to cart</button>
                            :
                            <button className='addBtn'>Choose Size</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default AddToCartPopUp