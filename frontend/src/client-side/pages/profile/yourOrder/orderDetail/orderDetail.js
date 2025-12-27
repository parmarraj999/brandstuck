import React, { useContext, useEffect, useRef } from 'react'
import './orderDetail.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase/firebaseConfig';

function OrderDetail({ setDetailPop, detailPop, currentData }) {

    console.log(currentData);

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

    function formatDateFromTimestamp(timestamp) {
        if (!timestamp || !timestamp.seconds) {
            return ''; // Handle cases where the timestamp might be missing or invalid
        }

        const date = new Date(timestamp.seconds * 1000 + timestamp.nanoseconds / 1000000);
        const day = date.getDate();
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const month = monthNames[date.getMonth()];
        const year = date.getFullYear();

        return `${day} ${month} ${year}`;
    }

    const cancelOrder = async () => {
        try {
            const orderRef = doc(db, "Orders", currentData?.id);

            await updateDoc(orderRef, {
                order_status: 'cancel',
                cancelAt: new Date(),
            });
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };


    return (
        <div className='order-detail-container' >
            <div className='order-detail-card' ref={cardRef} >
                <div className='backBtn' onClick={() => {
                    setDetailPop(false)
                    document.body.style.overflow = ''
                }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                </div>
                <div className='order-header' >
                    {
                        currentData?.order_status === 'Pending' ?
                            <img src='../../../../assets/images/pending.jpeg' />
                            : ''
                    }
                    {
                        currentData?.order_status === 'confirm' ?
                            <img src='../../../../assets/images/confirm.jpeg' />
                            : ''
                    }
                    {
                        currentData?.order_status === 'shipped' ?
                            <img src='../../../../assets/images/shipping.png' />
                            : ''
                    }
                    {
                        currentData?.order_status === 'delivered' ?
                            <img src='../../../../assets/images/deliverd.png' />
                            : ''
                    }
                    {
                        currentData?.order_status === 'cancel' ?
                            <img src='../../../../assets/images/cancel.jpeg' />
                            : ''
                    }
                    <h1>{currentData?.order_status}</h1>
                    {
                        currentData?.order_status === 'confirm' ?
                            <p>Your Order is Confirm</p>
                            : ""
                    }
                    {
                        currentData?.order_status === 'shipped' ?
                            <p>Your Order is Shipped</p>
                            : ""
                    }
                    {
                        currentData?.order_status === 'Pending' ?
                            <p>Order is Waiting for Confirmation</p>
                            : ""
                    }
                    {
                        currentData?.order_status === 'delivered' ?
                            <p>Your Order is Delivered</p>
                            : ""
                    }
                </div>
                <div className='order-items' >

                    {
                        currentData?.product.map((data) => {
                            return (
                                <div className='item' >
                                    <div>
                                        <h3>#{data?.productId}</h3>
                                        <h4>{data?.name} // {data?.brand}</h4>
                                        <h5 style={{ display: 'flex', gap: '.5rem' }}>size: {
                                            data?.sizes.map((data) => {
                                                return (
                                                    <div>{data}</div>
                                                )
                                            })
                                        }</h5>
                                    </div>
                                    <h6>rs.{data?.discountPrice}</h6>
                                </div>
                            )
                        })
                    }

                    <div className='order-summary-2' >
                        <div className='summary-header' >Order summary</div>
                        <div className='order-details-summary' >
                            <div className='order-item-summary' >
                                <h2>Total amount</h2>
                                <h3>rs.{currentData?.amount}</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>Order ID</h2>
                                <h3>#{currentData?.orderId}</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>Shipping Address</h2>
                                <h3>saket nagar, bhopal</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>tracking ID</h2>
                                <h3>{currentData?.trackingId}</h3>
                            </div>
                            {
                                currentData?.order_status === 'delivered' ?
                                    <div className='order-item-summary' >
                                        <h2>delivery date</h2>
                                        <h3>{formatDateFromTimestamp(currentData?.deliveredAt)}</h3>
                                    </div>
                                    :
                                    <div className='order-item-summary' >
                                        <h2>estimate delivery date</h2>
                                        <h3>{currentData?.estimate_date}</h3>
                                    </div>
                            }
                            {
                                currentData?.coupon ?
                                    <div className='order-item-summary' >
                                        <h2>Coupon Code</h2>
                                        <h3>{currentData?.coupon?.code}</h3>
                                    </div>
                                    :
                                    ''
                            }
                        </div>
                    </div>
                    {
                        currentData?.order_status === 'Pending' || currentData?.order_status === 'confirm' ?
                            <button className='cancel-btn' onClick={cancelOrder} >Cancel Order</button>
                            : ''

                    }
                    {
                        currentData?.order_status === 'cancel' ?
                            <p style={{ margin: '0 auto', fontSize: '14px', fontWeight: '500', color: 'rgba(0,0,0,0.6)' }}>Your Order Is Canceled</p>
                            :
                            <p style={{ margin: '0 auto', fontSize: '14px', fontWeight: '500', color: 'rgba(0,0,0,0.6)' }}>If order Shipped You can't cancel It</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default OrderDetail