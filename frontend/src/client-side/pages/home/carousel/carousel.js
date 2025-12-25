import { useState, useEffect } from 'react'
import './carousel.css'
import Shery from "sheryjs";
import { Link } from 'react-router-dom'
import { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    img: 'https://i.pinimg.com/474x/28/5f/40/285f40c9643d224d80de6a33f9d50f99.jpg',
  },
  {
    id: 2,
    img: 'https://i.pinimg.com/736x/99/99/c8/9999c8ce196c6592bc208ff6910f42e4.jpg',
  },
  {
    id: 3,
    img: 'https://i.pinimg.com/736x/89/d2/8d/89d28d2640ee549bdcdc88318c091177.jpg',
  },
  {
    id: 4,
    img: 'https://i.pinimg.com/736x/78/93/4f/78934fc7f30fc1e3a3ea54cd14f46041.jpg',
  },
]
const slides2 = [
  {
    id: 1,
    img: 'https://i.pinimg.com/736x/cf/18/6a/cf186adde4e35db35604d78dcd0f4776.jpg',
  },
  {
    id: 2,
    img: 'https://i.pinimg.com/474x/fc/ad/b4/fcadb4ad4c0bc1fb06853ac21bef9ed5.jpg',
  },
  {
    id: 3,
    img: 'https://i.pinimg.com/474x/43/fb/96/43fb967d6928fcddd30703460bdf92af.jpg',
  },
  {
    id: 4,
    img: 'https://i.pinimg.com/474x/e5/58/c4/e558c46b9fef2bac460edebdfdebc550.jpg',
  },
]

export default function Carousel() {





  const [currentSlide, setCurrentSlide] = useState(0)
  const slideInterval = 4000 // 3 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)
    }, slideInterval)

    return () => clearInterval(interval)
  }, [slideInterval])

  const handleSlideChange = (index) => {
    setCurrentSlide(index)
  }




  const btnRef = useRef(null);

  useEffect(() => {
    if (btnRef.current) {
      Shery.makeMagnet(btnRef.current);
    }

    return () => {
      // Cleanup function (if needed)
    };
  }, []);


  return (
    <div style={{ width: '100%', }} className='carousel-wrapper'>
      <div className="carousel-container">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="carousel-slide">
              <img src={slide.img} />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-container-mobile">
        <div
          className="carousel-track"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides2.map((slide) => (
            <div key={slide.id} className="carousel-slide">
              <img src={slide.img} />
            </div>
          ))}
        </div>
      </div>
      <div className="carousel-bubbles">
        {slides.map((_, index) => (
          <div
            key={index}
            className={`carousel-bubble ${currentSlide === index ? 'active' : ''}`}
            onClick={() => handleSlideChange(index)}
          />
        ))}
      </div>
      <div className='button_container' >
        <Link to='/shop' className='shop-btn' >
          Shop Now
         <ChevronRight size={25}/>
        </Link>

        {/* add after the page is ready  */}
        {/* <Link className='custome-btn' >
          <div>
            Customize Your
          </div>
          <div className='icon'  >
            <svg style={{ width: "25px", height: "25px" ,color:"white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>
          </div>
        </Link> */}
      </div>
    </div>
  )
}