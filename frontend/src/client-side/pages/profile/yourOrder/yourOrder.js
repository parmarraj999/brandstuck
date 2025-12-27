import { useContext, useEffect, useState } from 'react';
import './yourOrder.css';
import { useNavigate } from 'react-router-dom';
import OrderDetail from './orderDetail/orderDetail';
import { OrderDataContext } from '../../../context/getOrderData';
import { Ban, ChevronLeft, ChevronRight } from 'lucide-react'


export default function YourOrder() {

  const { orderData, fetchOrders } = useContext(OrderDataContext)
  const [activeTab, setActiveTab] = useState('all');
  const [currentData, setCurrentData] = useState([])

  // Filter orders based on active tab
  const filteredOrders = orderData.filter(order => {
    if (activeTab === 'all') return true;
    return order?.order_status === activeTab;
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

  useEffect(() => {
    fetchOrders();
  }, [])




  return (
    <div className='order-wrapper' >
      {
        detailPop ?
          <OrderDetail setDetailPop={setDetailPop} currentData={currentData} />
          : ''
      }
      <div className='back-btn' onClick={handleBack}>
        <ChevronLeft size={20} />
      </div>
      <div className="orders-container">
        <h1 className="orders-title">ORDERS</h1>
        <div className="tabs-container">
          <button
            onClick={() => setActiveTab('all')}
            className={`tab ${activeTab === 'all' ? 'active' : ''}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveTab('Pending')}
            className={`tab ${activeTab === 'Pending' ? 'active' : ''}`}
          >
            Pending
          </button>
          <button
            onClick={() => setActiveTab('confirm')}
            className={`tab ${activeTab === 'confirm' ? 'active' : ''}`}
          >
            Confirm
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
                {
                  order?.order_status === 'cancel' ?
                    <Ban size={25} color='red' />
                    :
                    <div className={`status-${order?.order_status}`}  >
                      <div className={`status-dot ${order?.order_status}`}></div>
                    </div>
                }
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
                        <ChevronRight size={20} />
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

