import React, { useContext, useEffect, useState } from 'react'
import './trendingCard.css'
import { Link } from 'react-router-dom';
import { AllProductDataContext } from '../../../context/AllProductDataProvider';

function TrendingCard({ productId }) {

    const [product, setProduct] = useState(null);

    const { AllProductList } = useContext(AllProductDataContext)

    const getProductById = (products, productId) => {
        if (!products || products.length === 0 || !productId) return null;
        return products.find((p) => p.id === productId || p.productId === productId) || null;
    };

    useEffect(() => {
        const found = getProductById(AllProductList, productId);
        setProduct(found);
    }, [AllProductList, productId]);

    if (!product) return null;

    return (
        <Link to={`/product/${product.id}`} className='default-card' style={{ textDecoration: 'none', color: 'inherit' }}>
            <div className='trend-card' >
                <img src={product?.imageUrls[0]?.imageUrl} alt={product.name} />
                <div className='card-detail' >
                    <h2>{product?.name}</h2>
                    <h3>RS.{product?.discountPrice}</h3>
                </div>
            </div>
        </Link>
    )
}

export default TrendingCard