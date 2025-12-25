import React, { useContext, useEffect, useState } from 'react'
import './product-detail.css'
import { useParams } from 'react-router-dom'
import CartSmall from '../../component/cartSmall/cartSmall'
import SmallNav from '../nav/smallNav'
import Footer from '../footer/footer'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'
import { cartDataContext } from '../../context/cartDataProvider'

function ProductDetail() {

  const { id } = useParams()
  
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);

  const { addToCart } = useContext(cartDataContext)

  console.log(product)

  const fetchProduct = async () => {
    try {
      setLoading(true)
      const docRef = doc(db, "All-Product", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // Sirf product ka data
        setProduct(docSnap.data());
        console.log('product data fetched')
      } else {
        console.log("No such product!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
      console.log(product)
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return <div className="product-container">
      <div className="skeleton-img skeleton"></div>

      <div className="product-info">
        <div className="skeleton-title skeleton"></div>
        <div className="skeleton-price skeleton"></div>
        <div className="skeleton-text skeleton"></div>
        <div className="skeleton-btn skeleton"></div>
      </div>
    </div>
  }

  return (
    <>

      <div className='product-detail-container'>
        <SmallNav />
        <div className='product-details-wrapper' >
          <div className='product-image' >
            <img src={product?.imageUrls[0]?.imageUrl} />
            <div className='more-img' >
              <img src={product?.imageUrls[1]?.imageUrl} />
              <img src={product?.imageUrls[2]?.imageUrl} />
              <img src={product?.imageUrls[3]?.imageUrl} />
              <img src={product?.imageUrls[4]?.imageUrl} />
            </div>
          </div>
          <div className='product-detail' >
            <div className='product-name' >
              <h1>{product?.name}</h1>
              <h2>{product?.subCategory}</h2>
            </div>
            <div className='product-price' >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "30px" }} >
                  <h3>rs.{product?.price}</h3>
                  <h4>rs.{product?.discountPrice}</h4>
                </div>
                <p>tax included</p>
              </div>
              <h5>50% off</h5>
            </div>
            <div className='add-to-cart-box-container' >
              <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                <h2>choose size</h2>
                {/* <h4>[size chart]</h4> */}
              </div>
              <div className='size-box-container' >
                {
                  product?.sizes?.map((data)=>{
                      return(
                        <div className='size-box' >{data}</div>
                      )
                  })
                }
                {/* <div className='size-box' >m</div>
                <div className='size-box' >l</div>
                <div className='size-box' >xl</div>
                <div className='size-box' >xxl</div> */}
              </div>
              <button onClick={()=>addToCart(product)}>Add to cart</button>
              <p>NOTE : YOU CAN APPLY COUPON CODE WHILE CONFIrMING ORDER IN CART </p>
            </div>

            <div className='shipping-details' >
              <h2>shipping</h2>
              <p>Your order will be dispatched within 24-48 hours</p>
              <p>After dispatch, it takes about</p>
              <li>4 to 7 working days for the rest of India.</li>
              <p>We ship your order from Narsinghpur, Madhya Pradesh.</p>
              <h2>delivery under 30 min in Narsinghpur,</h2>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}

export default ProductDetail