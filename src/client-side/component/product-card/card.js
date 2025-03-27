import React from 'react'
import './card.css'

function Card({ imageUrl, name, price }) {
  return (
    <div className='default-card'>
      <div className='card' >
        <img src={imageUrl} />
        <div className='card-detail' >
          <h2>{name}</h2>
          <h3>&#8377;{price}</h3>
        </div>
      </div>
    </div>
  )
}

export default Card