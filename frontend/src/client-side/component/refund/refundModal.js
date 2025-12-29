import React, { useEffect, useState } from "react";
import "./refundModal.css";
import { X } from "lucide-react";
import { addDoc, collection, doc, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebaseConfig";

const RefundPopup = ({ onClose, order }) => {

    useEffect(() => {
        // 🔒 Scroll lock
        document.body.style.overflow = "hidden";

        return () => {
            // 🔓 Scroll unlock
            document.body.style.overflow = "auto";
        };
    }, []);

    const isRefundEligible = (refundEligibleTill) => {
        if (!refundEligibleTill) return false;

        const now = new Date();
        const eligibleTill = refundEligibleTill.toDate(); // 🔥 MOST IMPORTANT

        return now <= eligibleTill;
    };

    const [request, setRequest] = useState(false)

    function generate8DigitNumber() {
        return Math.floor(10000000 + Math.random() * 90000000);
    }
    const refundId = generate8DigitNumber();

    const handleWalletRefund = async () => {
        if (!isRefundEligible(order.refund_eligible_date)) {
            alert("Refund period expired");
            return;
        }

        const docRef = await addDoc(collection(db, "refund_requests"), {
            orderId: order.orderId, // 🔥 id sahi rakho
            userId: order.userData.uid,
            delivery_date : order?.deliveredAt,
            customer_name : order.userData.name,
             refund_id: refundId,
            customer_number : order.userData.number,
            amount: order.amount,
            refundType: "wallet",
            status: "Pending",
            createdAt: serverTimestamp(),
        })

        const orderRef = doc(db, "Orders", order.id);

        await updateDoc(orderRef, {
            refund: {
                refund_id: refundId,
                refund_doc_id: docRef.id,
                refund_request: 'Pending',
                refundType: 'wallet',
                refund_request_date: serverTimestamp(),
            }
        })
            .then(() => {
                setRequest(true);
            })

        // alert("Wallet refund request submitted");
    };

    return (
        <div className="refund-overlay" onClick={onClose}>
            <div
                className="refund-sheet"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="sheet-header">
                    <div className="drag-indicator" />
                    <h3>Refund Details</h3>
                    <div onClick={onClose} className="close-btn">
                        <X size={25} />
                    </div>
                </div>
                {
                    request ?
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', gap: '15px' }}>
                            <img src="../../../../assets/images/tick.png" style={{ height: '200px' }} />
                            <h3 style={{ fontSize: '18px', fontWeight: 500, }}>Request Received! We contact Soon </h3>
                            <p style={{ fontSize: '14px', textAlign: 'center', color: 'grey' }}>You Need to send order return to our location with the label that we provide you, <b>If Label is not attached with parcel we did't accept return order!</b></p>
                        </div>
                        :
                        <div className="sheet-body">
                            <h2>Order #213923502</h2>
                            <p className="muted">Delivered • Eligible for refund</p>

                            <div className="refund-actions">
                                <button className="primary" onClick={handleWalletRefund}>Refund to Wallet</button>
                                <button className="secondary" style={{ border: '1px solid black', color: 'black' }}>Refund to Bank Account</button>
                            </div>

                            <div className="info-box">
                                <h3 style={{ fontSize: 16, fontWeight: 600, color: 'red' }}>Notice</h3>
                                <p>You Need to send order return to our location with the label that we provide you, <b>If Label is not attached with parcel we did't accept return order!</b></p>
                                {/* <p>
                            Refund will be processed within <b>3–5 working days</b>.
                            For any issues, contact us.
                        </p> */}
                            </div>
                        </div>
                }
            </div>
        </div>
    );
};

export default RefundPopup;
