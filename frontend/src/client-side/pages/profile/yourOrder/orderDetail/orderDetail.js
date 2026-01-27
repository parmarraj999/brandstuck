import React, { useContext, useEffect, useRef, useState } from 'react'
import './orderDetail.css';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../../../firebase/firebaseConfig';
import RefundPopup from '../../../../component/refund/refundModal';
import { OrderDetailStore } from '../../../../context/orderDetailStore';
import { OrderDataContext } from '../../../../context/getOrderData';

function OrderDetail({ setDetailPop, detailPop }) {

    // const { currentOrder } = useContext(OrderDetailStore);

    const { orderData } = useContext(OrderDataContext);
    const { currentOrderData } = useContext(OrderDetailStore);

    const currentOrder = orderData.find(
        (o) => o.orderId === currentOrderData.orderId
    );
    console.log(currentOrder)
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
            const orderRef = doc(db, "Orders", currentOrder?.id);

            await updateDoc(orderRef, {
                order_status: 'cancel',
                cancelAt: new Date(),
            });
        } catch (error) {
            console.error("Error updating order status:", error);
        }
    };

    const [showRefund, setShowRefund] = useState(false)

    const refundHandle = () => {
        setShowRefund(true)
    }

    const formatRefundDateTime = (timestampInput) => {
        const date = new Date(timestampInput);

        const datePart = date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric",
            timeZone: "Asia/Kolkata",
        });

        const timePart = date.toLocaleTimeString("en-IN", {
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
            timeZone: "Asia/Kolkata",
        });

        return `${datePart}, ${timePart}`;
    };

    const isRefundEligible = (refundEligibleTill) => {
        if (!refundEligibleTill) return false;

        const now = new Date();
        const eligibleTill = refundEligibleTill.toDate(); // 🔥 MOST IMPORTANT

        return now <= eligibleTill;
    };

    const isRefund = isRefundEligible(currentOrder?.refund_eligible_date)

    const handleDownload = async (url) => {
        if (!url) {
            console.error("Download URL missing");
            return;
        }

        const cleanUrl = url.split("?")[0]; // remove firebase token
        const fileName = cleanUrl.substring(cleanUrl.lastIndexOf("/") + 1);

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName || "refund-label";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className='order-detail-container' >
            {
                showRefund ?
                    <RefundPopup onClose={() => setShowRefund(false)} order={currentOrder} />
                    : ''
            }
            <div className='order-detail-card' ref={cardRef} >
                <div className='backBtn' onClick={() => {
                    setDetailPop(false)
                    document.body.style.overflow = ''
                }} >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
                </div>
                <div className='order-header' >

                    {/* setting image according to status  */}
                    {
                        currentOrder?.order_status === 'Pending' ?
                            <img src='../../../../assets/images/pending.jpeg' />
                            : ''
                    }
                    {
                        currentOrder?.order_status === 'confirm' ?
                            <img src='../../../../assets/images/confirm.jpeg' />
                            : ''
                    }
                    {
                        currentOrder?.order_status === 'shipped' ?
                            <img src='../../../../assets/images/shipping.png' />
                            : ''
                    }
                    {
                        currentOrder?.order_status === 'cancel' ?
                            <img src='../../../../assets/images/cancel.jpeg' />
                            : ''
                    }
                    {
                        currentOrder?.refund ?
                            ''
                            :
                            <>
                                {
                                    currentOrder?.order_status === 'delivered' ?
                                        <img src='../../../../assets/images/deliverd.png' />
                                        : ''
                                }
                            </>
                    }
                    {
                        currentOrder?.refund?.refund_request === 'pending' ?
                            <img src='../../../../assets/images/refund-pending.jpeg' />
                            :
                            ''
                    }
                    {
                        currentOrder?.refund?.refund_request === 'confirm' ?
                            <img src='../../../../assets/images/confirm-refund.png' />
                            :
                            <>

                            </>
                    }
                    {
                        currentOrder?.refund?.refund_request === 'successfull' ?
                            <img src='../../../../assets/images/tick.png' />
                            :
                            <>

                            </>
                    }
                    {/* setting heading according to status  */}

                    {
                        currentOrder?.refund ?
                            <h1>Refund {currentOrder?.refund?.refund_request}</h1>
                            :
                            <h1>{currentOrder?.order_status}</h1>
                    }

                    {
                        currentOrder?.order_status === 'confirm' ?
                            <p>Your Order is Confirm</p>
                            : ""
                    }
                    {
                        currentOrder?.order_status === 'shipped' ?
                            <p>Your Order is Shipped</p>
                            : ""
                    }
                    {
                        currentOrder?.order_status === 'Pending' ?
                            <p>Order is Waiting for Confirmation</p>
                            : ""
                    }
                    {
                        currentOrder?.order_status === 'delivered' ?
                            <p style={currentOrder?.refund ? { display: 'none' } : {}}>Your Order is Delivered</p>
                            : ""
                    }
                </div>
                <div className='order-items' >

                    {
                        currentOrder?.product.map((data) => {
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
                                <h3>rs.{currentOrder?.amount}</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>Order ID</h2>
                                <h3>#{currentOrder?.orderId}</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>Shipping Address</h2>
                                <h3>saket nagar, bhopal</h3>
                            </div>
                            <div className='order-item-summary' >
                                <h2>Refund Till</h2>
                                {
                                    isRefund ?
                                        <h3>{formatDateFromTimestamp(currentOrder?.refund_eligible_date)}</h3>
                                        :
                                        <h3>Expired</h3>
                                }
                            </div>
                            <div className='order-item-summary' >
                                <h2>tracking ID</h2>
                                <h3>{currentOrder?.trackingId}</h3>
                            </div>

                            {
                                currentOrder?.order_status === 'delivered' ?
                                    <div className='order-item-summary' >
                                        <h2>delivery date</h2>
                                        <h3>{formatDateFromTimestamp(currentOrder?.deliveredAt)}</h3>
                                    </div>
                                    :
                                    <div className='order-item-summary' >
                                        <h2>estimate delivery date</h2>
                                        <h3>{currentOrder?.estimate_date}</h3>
                                    </div>
                            }
                            {
                                currentOrder?.coupon !== null ?
                                    <div className='order-item-summary' >
                                        <h2>Coupon Code</h2>
                                        <h3>{currentOrder?.coupon?.code}</h3>
                                    </div>
                                    :
                                    ''
                            }

                        </div>
                    </div>
                    {
                        currentOrder?.order_status === 'Pending' || currentOrder?.order_status === 'confirm' ?
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                <button className='cancel-btn' onClick={cancelOrder} >Cancel Order</button>
                                <p style={{ margin: '0 auto', fontSize: '14px', fontWeight: '500', color: 'rgba(0,0,0,0.6)' }}>If order Shipped You can't cancel It</p>
                            </div>
                            : ''

                    }
                    {
                        currentOrder?.order_status === 'cancel' ?
                            <p style={{ margin: '0 auto', fontSize: '14px', fontWeight: '500', color: 'rgba(0,0,0,0.6)' }}>Your Order Is Canceled</p>
                            :
                            ''
                    }
                    {/* refund action on according to basis  */}
                    {
                        currentOrder?.refund ?
                            <div className='order-summary-2' >
                                <div className='summary-header' >Refund Details</div>
                                <div className='order-details-summary' >
                                    <div className='order-item-summary' >
                                        <h2>Request Id</h2>
                                        <h3>#{currentOrder?.refund?.refund_id}</h3>
                                    </div>
                                    <div className='order-item-summary' >
                                        <h2>Request Date</h2>
                                        <h3>{formatDateFromTimestamp(currentOrder?.refund?.refund_request_date)}</h3>
                                    </div>
                                    <div className='order-item-summary' >
                                        <h2>Return Address</h2>
                                        <h3 style={{ textAlign: 'right', width: '80%' }}>Main Rd, Narsinghpur, Madhya Pradesh, 487001</h3>
                                    </div>
                                    <div className='order-item-summary' >
                                        <h2>Contact No.</h2>
                                        <h3>12312323</h3>
                                    </div>
                                    {
                                        currentOrder?.refund?.bank_detail ?
                                            <>
                                                <div className='order-item-summary' >
                                                    <h2>Account number</h2>
                                                    <h3>{currentOrder?.refund?.bank_detail?.account_number}</h3>
                                                </div>
                                                <div className='order-item-summary' >
                                                    <h2>Account Holder</h2>
                                                    <h3>{currentOrder?.refund?.bank_detail?.account_holder}</h3>
                                                </div>
                                                <div className='order-item-summary' >
                                                    <h2>IFSC code</h2>
                                                    <h3>{currentOrder?.refund?.bank_detail?.ifsc}</h3>
                                                </div>
                                            </>
                                            : ''
                                    }

                                    {
                                        currentOrder?.refund?.refund_request === 'successfull' ?
                                            <>
                                                <div className='order-item-summary' >
                                                    <h2>Refund Date.</h2>
                                                    <h3>{formatDateFromTimestamp(currentOrder?.refund?.refund_complete_date)}</h3>
                                                </div>
                                                <div className='order-item-summary' >
                                                    <h2>Amount Refund</h2>
                                                    <h3>RS.{currentOrder.amount - 150}</h3>
                                                </div>
                                            </>
                                            : ''
                                    }
                                    {
                                        currentOrder?.refund?.returnLabelUrl ?
                                            <a
                                                href={currentOrder?.refund?.returnLabelUrl}
                                                download={currentOrder?.refund?.returnLabelUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className='label-btn'
                                            >

                                                Download Label

                                            </a>
                                            : ''
                                    }
                                    <p></p>
                                </div>
                            </div>
                            :
                            <>
                                {
                                    currentOrder?.order_status === 'delivered' ?
                                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                                            <button className='refund-btn' onClick={refundHandle} >Refund</button>
                                        </div>
                                        : ''
                                }
                            </>
                    }
                </div>
            </div>
        </div >
    )
}

export default OrderDetail