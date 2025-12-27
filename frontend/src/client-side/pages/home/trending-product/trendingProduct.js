import React, { useEffect, useState } from 'react'
import './trendingProduct.css'
import TrendingCard from '../../../component/product-card/trendingCard/trendingCard'
import { fetchTrendingProducts } from '../../../functions/trendingProductFetch';

function TrendingProduct() {

    const [productIds, setProductIds] = useState([]);

    useEffect(() => {
        const loadNewDrop = async () => {
            const ids = await fetchTrendingProducts();
            setProductIds(ids);
            console.log("treing",ids)
        };

        loadNewDrop();
    }, []);

    return (
        <div className='trending-product-container' >
            <h1 className='section-heading'>Trending</h1>
            <div className='trending-wrapper' >
                {
                    productIds.map((data, index) => {
                        return (
                            // <div style={{paddingTop:'15px'}} >
                            // <Card imageUrl={data.imageUrl} name={data.name} price={data.price} />
                            //     </div>
                            <TrendingCard productId={data}/>
                        )
                    })
                }
            </div>
            <button>Show Now</button>
        </div>
    )
}

export default TrendingProduct