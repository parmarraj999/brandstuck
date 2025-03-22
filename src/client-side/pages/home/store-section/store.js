import React, { useRef } from 'react'
import './store.css'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Store() {

    const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "60px",
        slidesToShow: 3,
        speed: 500,
    };

    let sliderRef = useRef(null);

    const next = () => {
        sliderRef.slickNext();
    };
    const prev = () => {
        sliderRef.slickPrev();
    };

    const data = [
        {
            img: 'https://i.pinimg.com/474x/d9/7e/42/d97e42759bb04ddaee4e9f46f8024468.jpg'
        },
        {
            img: 'https://i.pinimg.com/474x/a3/c8/99/a3c89901e8a7c6a4564edab12a4d94ea.jpg'
        },
        {
            img: 'https://i.pinimg.com/474x/53/7c/67/537c67cb4e9de686d87f8a5a65996640.jpg'
        },
        {
            img: 'https://i.pinimg.com/474x/04/d2/c6/04d2c61806de79bbb9eb973ba52e7314.jpg'
        },
        {
            img: 'https://i.pinimg.com/474x/9f/e2/dd/9fe2dd10d5d483438d5f82d3c9775815.jpg'
        },
        {
            img: 'https://i.pinimg.com/474x/42/f2/8a/42f28a5c4868b35cc36849c42b6ddbfd.jpg'
        },
    ]

    return (
        <div className='store-section' >
            <div className='store-header' >
                <h1 className='section-heading' >in-store experience</h1>
                <h3>narsinghpur, mp</h3>
            </div>
            <div className='store-image-container' >
                <Slider {...settings}
                    ref={slider => {
                        sliderRef = slider;
                    }}
                >
                    {
                        data.map((data) => {
                            return (
                                <div className='store-image' >
                                    <img src={data.img} alt='store' />
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
            <div className='slider-button'>
                <div className='slide-btn' onClick={prev}>
                    <svg style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M10.8284 12.0007L15.7782 16.9504L14.364 18.3646L8 12.0007L14.364 5.63672L15.7782 7.05093L10.8284 12.0007Z"></path></svg>
                </div>
                <div className='slide-btn' onClick={next}>
                    <svg style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                </div>
            </div>
        </div>
    )
}

export default Store