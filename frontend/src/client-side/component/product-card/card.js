import React, { useContext, useEffect, useState } from "react";
import "./card.css";
import { AllProductDataContext } from "../../context/AllProductDataProvider";

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


  return (
    <div className="default-card">
      <div className="card">
        <img src={product?.imageUrls?.[0]?.imageUrl} />

        <div className="product-detail">
          <h2>{product?.name}</h2>

          <div className="price-detail">
            <div style={{ display: "flex", gap: "1rem" }}>
              {product?.price && <h3 className="cancel">RS.{product?.price}</h3>}
              <h3>RS.{product?.discountPrice}</h3>
            </div>

            {product?.discountPrice && (
              <h4>
                {Math.round(((product?.price - product?.discountPrice) / product?.price) * 100)}% off
              </h4>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
