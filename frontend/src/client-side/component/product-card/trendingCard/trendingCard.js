import React, { useContext, useEffect, useState } from 'react'
import './trendingCard.css'
import { AllProductDataContext } from '../../../context/AllProductDataProvider';

function TrendingCard({productId}) {

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

    return (
        <div className='default-card'>
            <div className='card' >
                <img src={product?.imageUrls[0]?.imageUrl} />
                <div className='card-detail' >
                    <h2>{product?.name}</h2>
                    <h3>RS.{product?.discountPrice}</h3>
                </div>
            </div>
        </div>
    )
}

export default TrendingCard