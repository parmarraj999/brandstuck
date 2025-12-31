import React, { useContext, useState } from 'react';
import './wallet.css';
import { ChevronLeft, MoveDownLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { UserCredentialContext } from '../../../context/userCredentialProvider';
import { TransactionsContext } from '../../../context/transactoinProvider';

const Wallet = () => {
    const { userCredential } = useContext(UserCredentialContext)
    const { transactions } = useContext(TransactionsContext);
    console.log(transactions)

    const navigate = useNavigate()

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
        <div className="wallet-container">

            <div className="transactions-section">
                <div className="transactions-header">
                    <div onClick={()=>navigate(-1)}>
                        <ChevronLeft size={25}/>
                    </div>
                    <h2>My Transactions</h2>
                    <div></div>
                </div>

                <div className="transaction-group">
                    {
                        transactions.map((data) => {
                            return (
                                <div className="transaction-item">
                                    <div className="transaction-icon">
                                        {
                                            data.refund_on === 'wallet' ?
                                                <img src='../../../../assets/images/wallet.png' />
                                                :
                                                <img src='../../../../assets/images/bank.png' />

                                        }
                                    </div>
                                    <div className="transaction-details">
                                        <div className="transaction-title">Refund Order #{data.orderId}</div>
                                        <div className="transaction-meta">
                                            {formatDateFromTimestamp(data.createdAt)}
                                        </div>
                                    </div>
                                    <div className="transaction-right">
                                        <div className="transaction-amount">₹{data.amount}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Wallet;