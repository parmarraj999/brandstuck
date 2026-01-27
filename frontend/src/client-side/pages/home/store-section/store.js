import React, { useEffect, useRef, useState } from 'react'
import './store.css'
import Slider from "react-slick";
import { fetchStoreImages } from '../../../functions/fetchStoreImages';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Store() {

    const [settings, setSettings] = useState({})
    const [storeImages, setStoreImages] = useState([]);
    const width = window.innerWidth;

    useEffect(() => {
        const getImages = async () => {
            const imgs = await fetchStoreImages();
            setStoreImages(imgs);
        }
        getImages();

        if (width < 768) {
            setSettings({
                dots: false,
                infinite: true,
                centerMode: true,
                slidesToShow: 1,
                slidesToScroll: 1,
                centerPadding: '20px'
            })
        } else {
            setSettings({
                className: "center",
                centerMode: true,
                infinite: true,
                centerPadding: "60px",
                slidesToShow: 3,
                speed: 500,
            })
        }
    }, [])

    let sliderRef = useRef(null);

    const next = () => {
        sliderRef.slickNext();
    };
    const prev = () => {
        sliderRef.slickPrev();
    };

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
                        storeImages.map((item, index) => {
                            return (
                                <div className='store-image' key={index}>
                                    <img src={item} alt='store' />
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