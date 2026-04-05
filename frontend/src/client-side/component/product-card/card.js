import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import { AllProductDataContext } from "../../context/AllProductDataProvider";
import { Link } from "react-router-dom";

function ProductCard({ productId }) {
  const [product, setProduct] = useState(null);

  const { AllProductList } = useContext(AllProductDataContext)

  const getProductById = (products, productId) => {
    if (!products || products.length === 0 || !productId) return null;
    console.log(products.find((p) => p.id === productId))
    return products.find((p) => p.id === productId) || null;
  };

  useEffect(() => {
    const found = getProductById(AllProductList, productId);
    setProduct(found);
  }, [AllProductList, productId]);

  console.log(product)


  const isSold = product?.status === 'sold';

  return (
    <Link to={`/product/${product?.id}`} className='default-card' style={{ textDecoration: 'none', color: 'inherit', position: 'relative' }}>
      <div className="card">
        {isSold && <div className="card-sold-badge">Sold Out</div>}
        <img src={product?.imageUrls?.[0]?.imageUrl} alt={product?.name} />

        <div className="product-detail">
          <h2>{product?.name}</h2>

          <div className="price-detail">
            <div style={{ display: "flex", gap: "1rem" }}>
              {product?.price && <h3 className="cancel">RS.{product?.price}</h3>}
              <h3>RS.{product?.discountPrice}</h3>
            </div>

            {product?.discountPrice && (
              <h4>
                {product?.price ? Math.round(((product?.price - product?.discountPrice) / product?.price) * 100) : 0}% off
              </h4>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;
