import React, { useContext, useEffect, useRef } from 'react'
import './orderDetail.css';

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
                    <img src='../../../../assets/images/pending.jpeg' />
                    <h1>{currentData.orderStatus}...</h1>
                    {
                        currentData.orderStatus === 'shipped'?
                        <p>Your Order is Shipped</p>
                        : ""
                    }
                    {
                        currentData.orderStatus === 'pending'?
                        <p>Your Order is Confirmed and Packaging</p>
                        : ""
                    }
                    {
                        currentData.orderStatus === 'delivered'?
                        <p>Your Order is Delivered</p>
                        : ""
                    }
                    <p>{currentData.address}</p>
                </div>
                <div className='order-items' >

                    {
                        currentData.products.map((data) => {
                            return (
                                <div className='item' >
                                    <div>
                                        <h3>#{data.productId}</h3>
                                        <h4>{data.name} // {data.brand}</h4>
                                        <h5 style={{display:'flex',gap:'.5rem'}}>size: {
                                            data.sizes.map((data)=>{
                                                return(
                                                    <div>{data}</div>
                                                )
                                            })
                                            }</h5>
                                    </div>
                                    <h6>rs.{data.discountPrice}</h6>
                                </div>
                            )
                        })
                    }

                    <div className='order-summary-2' >
                        <div className='summary-header' >Order summary</div>
                        <div className='order-details-summary' >
                            <div className='order-item-summary' >
                                <h2>Total amount</h2>
                                <h3>rs.{currentData.totalAmount}</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>Order ID</h2>
                                <h3>#{currentData.orderId}</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>Shipping Address</h2>
                                <h3>saket nagar, bhopal</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>tracking ID</h2>
                                <h3>-</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>estimate delivery date</h2>
                                <h3>{formatDateFromTimestamp(currentData.orderDate)}</h3>
                            </div>
                        </div>
                    </div>
                    <button className='cancel-btn' >Cancel Order</button>
                    <p style={{margin:'0 auto',fontSize:'14px',fontWeight:'400',color:'rgba(0,0,0,0.6)'}}>If order Shipped You can't cancel It</p>
                </div>
            </div>
        </div>
    )
}

export default OrderDetail