import { useContext, useEffect, useState } from 'react';
import './yourOrder.css';
import { useNavigate } from 'react-router-dom';
import OrderDetail from './orderDetail/orderDetail';
import { OrderDataContext } from '../../../context/getOrderData';

export default function YourOrder() {

  const { orderData, fetchOrders } = useContext(OrderDataContext)
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

  useEffect(()=>{
    fetchOrders();
  },[])

  function formatServerTime(dateInput) {
    let date;

    // Firestore Timestamp handle
    if (dateInput?.seconds) {
      date = new Date(dateInput.seconds * 1000);
    }
    // Normal Date / string
    else {
      date = new Date(dateInput);
    }

    if (isNaN(date.getTime())) return "Invalid date";

    const day = date.getDate().toString().padStart(2, "0");
    const month = date.toLocaleString("en-IN", { month: "short" });
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12;
    hours = hours.toString().padStart(2, "0");

    return `${day} ${month} ${year}, ${hours}:${minutes} ${ampm}`;
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
            <div key={`${order?.orderId}-${index}`} className="order-card" onClick={() => {
              setDetailPop(true)
              setCurrentData(order)
            }} style={order?.order_status === 'delivered' ? { display: 'none' } : {}}>
              <div className="order-info">
                <div className={`status-${order?.order_status}`} >
                  <div className={`status-dot ${order?.order_status}`}></div>
                </div>
                <div>
                  <div className="order-id">Order #{order?.orderId}</div>
                  <div className="order-date">{formatDateFromTimestamp(order?.orderAt)}</div>
                </div>
              </div>
              <div className="order-details">
                <div className="amount-container">
                  <div className="amount">RS.{order?.amount}</div>
                  <div className="items">{order?.product?.length} Items</div>
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
              {/* <h2 className="section-title">Complete Orders</h2> */}
              <hr/>
              <div className='orders-list' >
                {orderData.map((order, index) => (
                  <div key={`${order?.userId}-${index}`} className="order-card" onClick={() => {
                    setDetailPop(true)
                    setCurrentData(order)
                  }}
                    style={order?.order_status === 'delivered' ? { display: 'flex' } : { display: 'none' }} >
                    <div className="order-info" >
                      <div className={`status-${order?.order_status}`}  >
                        <div className={`status-dot ${order?.order_status}`}></div>
                      </div>
                      <div>
                        <div className="order-id">Order #{order?.orderId}</div>
                        <div className="order-date">{formatDateFromTimestamp(order?.orderAt)}</div>
                      </div>
                    </div>
                    <div className="order-details">
                      <div className="amount-container">
                        <div className="amount">RS.{order?.amount}</div>
                        <div className="items">{order?.product?.length} Items</div>
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