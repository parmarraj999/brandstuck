import { useState, useEffect } from 'react'
import './carousel.css'
import { Link } from 'react-router-dom'

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
    img: 'https://i.pinimg.com/474x/cf/b0/58/cfb058ab6bfd8c57d0c641ed32fba8c7.jpg',
  },
  {
    id: 2,
    img: 'https://i.pinimg.com/474x/5f/69/cc/5f69cc30d9ca20d4e033c86469a1ffe9.jpg',
  },
  {
    id: 3,
    img: 'https://i.pinimg.com/736x/33/89/e3/3389e397b2ad284c4829208ac4765b6d.jpg',
  },
  {
    id: 4,
    img: 'https://i.pinimg.com/474x/f1/c2/c9/f1c2c93af954792263f6558a70d8c5f4.jpg',
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
        <Link className='shop-btn' >Shop Now
          <svg style={{width:"25px"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
        </Link>
        <Link className='custome-btn' >
          <div>
            Customize Your
          </div>
          <div className='icon'  >
            <svg style={{ width: "25px", height: "25px" ,color:"white"}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89H6.41421L15.7279 9.57627ZM17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785L17.1421 8.16206ZM7.24264 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L7.24264 20.89Z"></path></svg>
          </div>
        </Link>
      </div>
    </div>
  )
}