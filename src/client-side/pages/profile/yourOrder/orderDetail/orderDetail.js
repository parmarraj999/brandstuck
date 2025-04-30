import React, { useContext, useEffect, useRef } from 'react'
import './orderDetail.css';

function OrderDetail({ setDetailPop, detailPop }) {

    const cardRef = useRef()
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (cardRef.current && !cardRef.current.contains(event.target)) {
                setDetailPop(false);
            }
        };
        if (detailPop) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [detailPop]);

    return (
        <div className='order-detail-container' >
            <div className='backBtn' onClick={() => {
                setDetailPop(false)
                document.body.style.overflow = ''
            }} >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
            </div>
            <div className='order-detail-card' ref={cardRef} >
                <div className='order-header' >
                    <img src='../../../../assets/images/pending.jpeg' />
                    <h1>Pending...</h1>
                    <p>Your Order is Confirm and Packaging</p>
                </div>
                <div className='order-items' >
                   
                    <div className='item' >
                        <div>
                            <h3>#10231</h3>
                            <h4>T-shirt // selected hommie</h4>
                            <h5>size: L</h5>
                        </div>
                        <h6>rs.1000</h6>
                    </div>

                    <div className='order-summary' >
                        <div className='summary-header' >Order summary</div>
                        <div className='order-details' >
                            <div className='order-item' >
                                <h2>Total amount</h2>
                                <h3>rs.2300</h3>
                            </div>
                            <div className='order-item' >
                                <h2>Order ID</h2>
                                <h3>20342</h3>
                            </div>
                            <div className='order-item' >
                                <h2>Shipping Address</h2>
                                <h3>saket nagar, bhopal</h3>
                            </div>
                            <div className='order-item' >
                                <h2>tracking ID</h2>
                                <h3>-</h3>
                            </div>
                            <div className='order-item' >
                                <h2>estimate delivery date</h2>
                                <h3>1 may 2025</h3>
                            </div>
                        </div>
                    </div>
                <button className='cancel-btn' >Cancel Order</button>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail