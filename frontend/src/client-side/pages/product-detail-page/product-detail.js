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

  const { addToCart, isProductInCart } = useContext(cartDataContext)


  const fetchProduct = async () => {
    try {
      setLoading(true)
      const docRef = doc(db, "All-Product", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setProduct({ id: docSnap.id, ...docSnap.data() });
        console.log('product data fetched')
      } else {
        console.log("No such product!");
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
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

  const isSold = product?.status === 'sold';

  return (
    <>

      <div className='product-detail-container'>
        <SmallNav />
        <div className='product-details-wrapper' >
          <div className='product-image' >
            {isSold && <div className="sold-badge">SOLD</div>}
            <img src={product?.imageUrls?.[0]?.imageUrl} alt={product?.name} />
            <div className='more-img' >
              {product?.imageUrls?.slice(1, 5).map((img, index) => (
                <img key={index} src={img.imageUrl} alt={`${product?.name} view ${index + 1}`} />
              ))}
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
              <h5>{Math.round(((product?.price - product?.discountPrice) / product?.price) * 100)}% off</h5>
            </div>
            <div className='add-to-cart-box-container' >
              <div style={{ display: "flex", alignItems: "center", justifyContent: 'space-between' }}>
                <h2>choose size</h2>
              </div>
              <div className='size-box-container' >
                {
                  product?.sizes?.map((data, index) => {
                    return (
                      <div key={index} className='size-box' >{data}</div>
                    )
                  })
                }
              </div>
              {
                isSold ? (
                  <button className='sold-out-btn' disabled>Sold Out</button>
                ) : (
                  isProductInCart(product.id) ? (
                    <button className='inCart'>Added to Cart</button>
                  ) : (
                    <button onClick={() => addToCart(product)}>Add to cart</button>
                  )
                )
              }
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