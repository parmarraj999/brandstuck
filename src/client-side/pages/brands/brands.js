import React from 'react'
import './brands.css';
import SmallNav from '../nav/smallNav';

function Brands() {

  const brandsData = [
    {
      "name": "Spykar",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/"
    },
    {
      "name": "Mufti",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "U.S. Polo Assn.",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Pepe Jeans",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Snitch",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Selected Homme",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Indigo Nation",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Jack & Jones",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Only & Sons",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Flying Machine",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "United Colors of Benetton",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Wrogn",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Monte Carlo",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Zara",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Dsquared2",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Killer",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "G-Star",
      "types": [
        "Clothes",
        "Accessories",
        "Shoes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Nostrum",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "The Bear House",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Gas",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Tommy Hilfiger",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Gant",
      "types": [
        "Clothes",
        "Accessories",
        "Shoes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Calvin Klein",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Souled Store",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Louis Philippe",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Allen Solly",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Uniqlo",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Converse",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Puma",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Lee",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Adidas",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Roit Jeans",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Being Human",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Manchester City",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Pro & Fit",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Caterpillar",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Armani Exchange",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Reebok",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Pull & Bear",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "H&M",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Bella Vita",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Westos",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Lee Cooper",
      "types": [
        "Clothes",
        "Shoes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Levi’s",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Roadstar",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "In Fuse",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Gap",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Beat London",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Big Star",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Skechers",
      "types": [
        "Shoes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "New Balance",
      "types": [
        "Shoes",
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Aeropostale",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Blackberrys",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Van Heusen",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Jockey",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    },
    {
      "name": "Unido",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo"
    }
  ]


  return (
    <div className='brands-container' >
      <SmallNav />
      <div className='brand-header' >
        <h1>Choose you favourite <br /> brand</h1>
      </div>
      <div className='brand-filters' >
      <div className='filter'>All</div>
      <div className='filter'>Clothes</div>
      <div className='filter'>Shoes</div>
      <div className='filter'>Accessories</div>
      </div>
      <div className='brand-wrapper' >
        <div className='brand-wrapper-header' >
          <h2>Available brands</h2>
          <div>200</div>
        </div>
        <div className='brand-list' >
         {
          brandsData.map((data,index)=>{
            return(
              <div className='brand-box' >
                </div>
            )
          })
         }
        </div>
      </div>
    </div>
  )
}

export default Brands