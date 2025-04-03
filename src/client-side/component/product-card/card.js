import React from 'react'
import './card.css'

function Card({ imageUrl, name, price }) {
  return (
    <div className='default-card'>
      <div className='card' >
        <img src={imageUrl} />
        {/* <div className='card-detail' >
          <h2>{name}</h2>
          <h3>&#8377;{price}</h3>
        </div> */}
        <div className='product-detail' >
          <h2> {name}</h2>
          <div className='price-detail' >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <h3 className='cancel'>RS.{price}</h3>
              <h3>RS.{price}</h3>
            </div>
            <h4>50% off</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card