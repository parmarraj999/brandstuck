import React from 'react'
import './trendingProduct.css'
import Card from '../../../component/product-card/card'

function TrendingProduct() {

    const data = [
        {
            "id": 1,
            "name": "Classic T-Shirt",
            "price": 19.99,
            "imageUrl": "https://i.pinimg.com/736x/27/b5/a1/27b5a1602087a7113d58118e357bdc54.jpg"
        },
        {
            "id": 2,
            "name": "Slim Fit Jeans",
            "price": 49.99,
            "imageUrl": "https://i.pinimg.com/736x/32/e8/8a/32e88acc2d35c3a4b12eec4fc3ade1db.jpg"
        },
        {
            "id": 3,
            "name": "Hooded Sweatshirt",
            "price": 34.50,
            "imageUrl": "https://i.pinimg.com/474x/1d/b7/d8/1db7d8cf4523592c5a37ef155cf01596.jpg"
        },
        {
            "id": 4,
            "name": "Running Shoes",
            "price": 79.95,
            "imageUrl": "https://i.pinimg.com/474x/09/57/0f/09570fb2ee1d67c7ca94bc473a490f2f.jpg"
        },
        {
            "id": 4,
            "name": "Running Shoes",
            "price": 79.95,
            "imageUrl": "https://i.pinimg.com/474x/09/57/0f/09570fb2ee1d67c7ca94bc473a490f2f.jpg"
        },
        {
            "id": 3,
            "name": "Hooded Sweatshirt",
            "price": 34.50,
            "imageUrl": "https://i.pinimg.com/474x/1d/b7/d8/1db7d8cf4523592c5a37ef155cf01596.jpg"
        },
        {
            "id": 5,
            "name": "Baseball Cap",
            "price": 14.99,
            "imageUrl": "https://i.pinimg.com/474x/c0/ef/70/c0ef7067d94118e5520134cf40da63da.jpg"
        },
        {
            "id": 6,
            "name": "Leather Jacket",
            "price": 129.00,
            "imageUrl": "https://i.pinimg.com/474x/f1/1c/a0/f11ca0a792419a24ecdd1ed293c87b10.jpg "
        }
    ]

    return (
        <div className='trending-product-container' >
            <h1 className='section-heading'>Trending</h1>
            <div className='trending-wrapper' >
                {
                    data.map((data, index) => {
                        return (
                            // <div style={{paddingTop:'15px'}} >
                            // <Card imageUrl={data.imageUrl} name={data.name} price={data.price} />
                            //     </div>
                            <div className='default-card'>
                                <div className='card' >
                                    <img src={data.imageUrl} />
                                    <div className='card-detail' >
                                        <h2>{data.name}</h2>
                                        <h3>RS.{data.price}</h3>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            <button>Show Now</button>
        </div>
    )
}

export default TrendingProduct