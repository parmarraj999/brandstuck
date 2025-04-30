import { useState } from 'react';
import './yourOrder.css';
import { useNavigate } from 'react-router-dom';
import OrderDetail from './orderDetail/orderDetail';

export default function YourOrder() {
  
  const [activeTab, setActiveTab] = useState('all');

  // Sample order data
  const orders = [
    {
      id: '123123',
      date: '25 Apr 2025',
      amount: 'RS.3500',
      items: 5,
      status: 'pending'
    },
    {
      id: '137775',
      date: '25 Apr 2025',
      amount: 'RS.3500',
      items: 5,
      status: 'shipped'
    },
    {
      id: '137775',
      date: '25 Apr 2025',
      amount: 'RS.3500',
      items: 5,
      status: 'delivered'
    }
  ];

  // Filter orders based on active tab
  const filteredOrders = orders.filter(order => {
    if (activeTab === 'all') return true;
    return order.status === activeTab.toLowerCase();
  });

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/profile')
  }

  const [detailPop,setDetailPop] = useState(false)

  return (
    <div className='order-wrapper' >
      {
        detailPop ?
        <OrderDetail setDetailPop={setDetailPop}/>
        : ''
      }
      <div className='back-btn' onClick={handleBack}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-left-icon lucide-chevron-left"><path d="m15 18-6-6 6-6" /></svg>
        Back
      </div>
      <div className="orders-container">
        {/* Title */}
        <h1 className="orders-title">ORDERS</h1>

        {/* Tabs */}
        <div className="tabs-container">
          <button
            onClick={() => setActiveTab('all')}
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('pending')}
            className={`tab ${activeTab === 'pending' ? 'active' : ''}`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab('shipped')}
            className={`tab ${activeTab === 'shipped' ? 'active' : ''}`}
          >
            Shipped
          </button>
          <button
            onClick={() => setActiveTab('delivered')}
            className={`tab ${activeTab === 'delivered' ? 'active' : ''}`}
          >
            Delivered
          </button>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Orders List */}
        <div className="orders-list">
          {filteredOrders.map((order, index) => (
            <div key={`${order.id}-${index}`} className="order-card" onClick={()=>setDetailPop(true)}>
              <div className="order-info">
                <div className={`status-${order.status}`} >
                  <div className={`status-dot ${order.status}`}></div>
                </div>
                <div>
                  <div className="order-id">Order #{order.id}</div>
                  <div className="order-date">{order.date}</div>
                </div>
              </div>
              <div className="order-details">
                <div className="amount-container">
                  <div className="amount">{order.amount}</div>
                  <div className="items">{order.items} items</div>
                </div>
                <button className="nav-button">
                  <ChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Complete Orders Section - Only shown when orders exist */}
        {activeTab === 'all' && orders.some(order => order.status === 'delivered') && (
          <div className="complete-orders-section">
            <h2 className="section-title">Complete Orders</h2>
            {orders.filter(order => order.status === 'delivered').map((order, index) => (
              <div key={`complete-${order.id}-${index}`} className="order-card">
                <div className="order-info">
                  <div className={`status-${order.status}`}>
                    <div className="status-dot delivered"></div>
                  </div>
                  <div>
                    <div className="order-id">Order #{order.id}</div>
                    <div className="order-date">{order.date}</div>
                  </div>
                </div>
                <div className="order-details">
                  <div className="amount-container">
                    <div className="amount">{order.amount}</div>
                    <div className="items">{order.items} items</div>
                  </div>
                  <button className="nav-button">
                    <ChevronRight />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ChevronRight icon component
function ChevronRight() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}