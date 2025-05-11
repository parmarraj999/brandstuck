import React, { useContext, useEffect, useRef, useState } from 'react'
import './cartSmall.css'
import gsap from 'gsap'
import CartProduct from './cart-product/cartProduct'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { AddOrderToFirestore } from '../../functions/placeOrder'
import { cartDataContext } from '../../context/cartDataProvider'

function CartSmall({ openCart, setOpenCart }) {

    useEffect(() => {
        if (openCart) {
            gsap.fromTo(".cart-small-container", {
                height: 0,
                duration: .5
            }, {
                height: "78vh",
                duration: .5
            })
        } else {
            gsap.fromTo(".cart-small-container", {
                height: "78vh",
                duration: .5,
            }, {
                height: 0,
                duration: .5
            })
        }
    })

    const popupRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                gsap.fromTo(".cart-small-container", {
                    height: "78vh",
                    duration: .5,
                }, {
                    height: 0,
                    duration: .5,
                    onComplete: () => {
                        setOpenCart(false)
                    }
                })
                gsap.to(".nav_container", {
                    background: '#a9a9a960',
                    boxShadow: 'none',
                })
            }
        }

        if (openCart) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [openCart, setOpenCart]);

    const navigate = useNavigate();
    const navigateTo = () =>{
        navigate('/cart')
    }
    const { cartItems, totalAmount, AddOrderTo } = useContext(cartDataContext)

    const handleOrder = () =>{
        navigateTo();
    }

    
    // const [productsToAdd,setProductsToAdd] = useState([cartItems])

    return (
        <div className='cart-small-container grid-system' ref={popupRef}>
            <div className='cart-header' >
                <h1>Shopping Cart</h1>
                <div className='expend-btn' onClick={navigateTo}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.41421 5H10V3H3V10H5V6.41421L9.29289 10.7071L10.7071 9.29289L6.41421 5ZM21 14H19V17.5858L14.7071 13.2929L13.2929 14.7071L17.5858 19H14V21H21V14Z"></path></svg>
                </div>
            </div>
            <div className='item-container' >
                {
                    cartItems.map((data)=>{
                        return(
                            <CartProduct data={data} setOpenCart={setOpenCart}/>
                        )
                    })
                }
            </div>
            <div className='total-container' >
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <h3>Subtotal :</h3>
                    <h3>rs. {totalAmount}</h3>
                </div>
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <h3>shipping :</h3>
                    <h3>+ rs. 150</h3>
                </div>
                <hr style={{ marginTop: '.2rem' }} />
                <div style={{ display: 'flex', alignItems: "center", justifyContent: "space-between" }}>
                    <h3>total :</h3>
                    <h3>rs. {totalAmount + 150}</h3>
                </div>
                <h4>tax and shipping included</h4>
                <button onClick={handleOrder}>Confirm order</button>
            </div>
        </div>
    )
}

export default CartSmall