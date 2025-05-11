import { useContext, useState } from 'react';
import './yourOrder.css';
import { useNavigate } from 'react-router-dom';
import OrderDetail from './orderDetail/orderDetail';
import { OrderDataContext } from '../../../context/getOrderData';

export default function YourOrder() {


  const { orderData } = useContext(OrderDataContext)
  const [activeTab, setActiveTab] = useState('all');
  const [currentData, setCurrentData] = useState([])

  // Filter orders based on active tab
  const filteredOrders = orderData.filter(order => {
    if (activeTab === 'all') return true;
    return order.orderStatus === activeTab.toLowerCase();
  });

  const navigate = useNavigate();
  const handleBack = () => {
    navigate('/profile')
  }

  const [detailPop, setDetailPop] = useState(false)

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
    <div className='order-wrapper' >
      {
        detailPop ?
          <OrderDetail setDetailPop={setDetailPop} currentData={currentData} />
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
            <div key={`${order.id}-${index}`} className="order-card" onClick={() => {
              setDetailPop(true)
              setCurrentData(order)
            }} style={order.orderStatus === 'delivered' ? { display: 'none' } : {}}>
              <div className="order-info">
                <div className={`status-${order.orderStatus}`} >
                  <div className={`status-dot ${order.orderStatus}`}></div>
                </div>
                <div>
                  <div className="order-id">Order #{order.orderId}</div>
                  <div className="order-date">{formatDateFromTimestamp(order.orderDate)}</div>
                </div>
              </div>
              <div className="order-details">
                <div className="amount-container">
                  <div className="amount">RS.{order.totalAmount}</div>
                  <div className="items">{order.products.length} Items</div>
                </div>
                <button className="nav-button">
                  <ChevronRight />
                </button>
              </div>
            </div>
          ))}
        </div>

        {
          activeTab === 'all' || activeTab === "delivered" ?
            <div className="complete-orders-section">
              <h2 className="section-title">Complete Orders</h2>
              <div className='orders-list' >
                {orderData.map((order, index) => (
                  <div key={`${order.id}-${index}`} className="order-card" onClick={() => {
                    setDetailPop(true)
                    setCurrentData(order)
                  }}
                    style={order.orderStatus === 'delivered' ? { display: 'flex' } : { display: 'none' }} >
                    <div className="order-info" >
                      <div className={`status-${order.orderStatus}`}  >
                        <div className={`status-dot ${order.orderStatus}`}></div>
                      </div>
                      <div>
                        <div className="order-id">Order #{order.orderId}</div>
                        <div className="order-date">{formatDateFromTimestamp(order.orderDate)}</div>
                      </div>
                    </div>
                    <div className="order-details">
                      <div className="amount-container">
                        <div className="amount">RS.{order.totalAmount}</div>
                        <div className="items">{order.products.length} Items</div>
                      </div>
                      <button className="nav-button">
                        <ChevronRight />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            : ''
        }

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