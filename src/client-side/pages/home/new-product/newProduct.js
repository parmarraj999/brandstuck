import React, { useRef, useState } from 'react'
import './newProduct.css';
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Card from '../../../component/product-card/card';

function NewProduct() {

    let sliderRef = useRef(null);
    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 4,
        centerPadding: "60px",
        slidesToScroll: 1,
    };

    const next = () => {
        sliderRef.slickNext();
    };
    const prev = () => {
        sliderRef.slickPrev();
    };

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
        <div className='new-product-container' >
            <h1 className='section-heading'>New Drops</h1>
            <div className="slider-container">
                <Slider
                    className='slider'
                    ref={slider => {
                        sliderRef = slider;
                    }}
                    {...settings}>
                    {
                        data.map((data, index) => {
                            return (
                                <Card imageUrl={data.imageUrl} name={data.name} price={data.price} />
                            )
                        })
                    }
                </Slider>
            </div>
            <div className='slider-button'>
                <div className='slide-btn' onClick={prev}>
                    <svg style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </div>
                <button>Shop Now</button>
                <div className='slide-btn' onClick={next}>
                    <svg  style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                </div>
            </div>
        </div >
    )
}

export default NewProduct