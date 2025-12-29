import React, { useState } from 'react';
import './wallet.css';
import { ChevronLeft} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const Wallet = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('This Week');
  const [expandedSection, setExpandedSection] = useState({ today: true, yesterday: true });

  const transactions = {
    today: [
      {
        id: 1,
        icon: '🎁',
        title: 'Engagement Reward',
        category: 'Personal',
        date: '12/5/2022, 12:01 PM',
        amount: '$99.00',
        status: 'Completed',
        statusColor: '#4CAF50'
      },
      {
        id: 2,
        icon: '💄',
        title: '2022 Sephora Summer Makeup Package',
        category: 'Personal',
        date: '12/5/2022, 12:01 PM',
        amount: '$99.00',
        status: 'Pending',
        statusColor: '#FF9800'
      },
      {
        id: 3,
        icon: '💳',
        title: 'Wallet Top up',
        category: 'Personal',
        date: '12/5/2022, 12:01 PM',
        amount: '$99.00',
        status: 'Failed',
        statusColor: '#F44336'
      },
      {
        id: 4,
        icon: '✂️',
        title: 'Management Cut',
        category: 'Personal',
        date: '12/5/2022, 12:01 PM',
        amount: '$99.00',
        status: 'Pending',
        statusColor: '#FF9800'
      }
    ],
    yesterday: [
      {
        id: 5,
        icon: '🎁',
        title: 'Participation Reward',
        category: 'Personal',
        date: '12/5/2022, 12:01 PM',
        amount: '$99.00',
        status: 'Completed',
        statusColor: '#4CAF50'
      },
      {
        id: 6,
        icon: '💄',
        title: '2022 Sephora Summer Makeup Package',
        category: 'Personal',
        date: '12/5/2022, 12:01 PM',
        amount: '$99.00',
        status: 'Pending',
        statusColor: '#FF9800'
      },
      {
        id: 7,
        icon: '💳',
        title: 'Wallet Top up',
        category: 'Personal',
        date: '12/5/2022, 12:01 PM',
        amount: '$99.00',
        status: 'Completed',
        statusColor: '#4CAF50'
      }
    ]
  };

  const toggleSection = (section) => {
    setExpandedSection(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navigate = useNavigate()

  return (
    <div className="wallet-container">
      <div className="wallet-card">
        <div className="wallet-header">
          <div className="wallet-title">
            <div style={{width:'40px',height:'40px',display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'5px',backgroundColor:'rgba(0,0,0,.1)'}} onClick={()=>navigate(-1)}>
                <ChevronLeft size={25}/>
            </div>
            <span style={{fontSize:'22px',fontWeight:600,marginLeft:'10px'}}>My Wallet</span>
          </div>
        </div>

        <div className="balance-section">
          <div className="balance-amount">$233.21</div>
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
          <div className="group-header" onClick={() => toggleSection('today')}>
            <span>Today</span>
            <span className={`arrow ${expandedSection.today ? 'expanded' : ''}`}>▲</span>
          </div>
          {expandedSection.today && (
            <div className="transaction-list">
              {transactions.today.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-icon">{transaction.icon}</div>
                  <div className="transaction-details">
                    <div className="transaction-title">{transaction.title}</div>
                    <div className="transaction-meta">
                      {transaction.category} · {transaction.date}
                    </div>
                  </div>
                  <div className="transaction-right">
                    <div className="transaction-amount">{transaction.amount}</div>
                    <div 
                      className="transaction-status" 
                      style={{ color: transaction.statusColor }}
                    >
                      {transaction.status}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Wallet;