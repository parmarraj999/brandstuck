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

    return (
        <div className="wallet-container">
            <div className="wallet-card">
                <div className="wallet-header">
                    <div className="wallet-title">
                        <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '5px', backgroundColor: 'rgba(0,0,0,.1)' }} onClick={() => navigate(-1)}>
                            <ChevronLeft size={25} />
                        </div>
                        <span style={{ fontSize: '22px', fontWeight: 600, marginLeft: '10px' }}>My Wallet</span>
                    </div>
                </div>

                <div className="balance-section">
                    <div className="balance-amount">₹{userCredential?.wallet}</div>
                </div>

                {/* <div className="action-buttons">
          <button className="btn btn-primary">
            <span>Withdraw</span>
            <span className="btn-icon">⊖</span>
          </button>
          <button className="btn btn-secondary">
            <span>Top Up</span>
            <span className="btn-icon">⊕</span>
          </button>
          <button className="btn btn-secondary">
            <span>Transfer</span>
            <span className="btn-icon">⊕</span>
          </button>
        </div> */}
            </div>

            <div className="transactions-section">
                <div className="transactions-header">
                    <h2>Transactions</h2>
                </div>

                <div className="transaction-group">
                    {
                        transactions.map((data) => {
                            return (
                                <div className="transaction-item">
                                    <div className="transaction-icon">
                                        {

                                        }
                                        <img src='../../../../assets/images/wallet.png' />
                                    </div>
                                    <div className="transaction-details">
                                        <div className="transaction-title">Refund Order #12312323</div>
                                        <div className="transaction-meta">
                                            12 jan 2025, 03:00 am
                                        </div>
                                    </div>
                                    <div className="transaction-right">
                                        <div className="transaction-amount">₹1200</div>
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