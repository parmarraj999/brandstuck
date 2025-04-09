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
      "image": "../../../../assets/brand-logo/spykar.jpg"
    },
    {
      "name": "Mufti",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/mufti.png"
    },
    {
      "name": "U.S. Polo Assn.",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/us-polo.jpeg"
    },
    {
      "name": "Pepe Jeans",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/pepe-jeans.png"
    },
    {
      "name": "Snitch",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/snitch.jpeg"
    },
    {
      "name": "Selected Homme",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/selected-homme.png"
    },
    {
      "name": "Indigo Nation",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/indigo-nation.jpg"
    },
    {
      "name": "Flying Machine",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/flying-machine.jpg"
    },
    {
      "name": "Jack & Jones",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/jack-jones.jpeg"
    },
    {
      "name": "Only & Sons",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/only-sons.png"
    },
    {
      "name": "United Colors of Benetton",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/united-colors-of-benetton.jpg"
    },
    {
      "name": "Wrogn",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/wrogn.png"
    },
    {
      "name": "Monte Carlo",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/monte-carlo.png"
    },
    {
      "name": "Zara",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/zara.png"
    },
    {
      "name": "Dsquared2",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/DSQUARED2.png"
    },
    {
      "name": "Killer",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/killer.png"
    },
    {
      "name": "G-Star",
      "types": [
        "Clothes",
        "Accessories",
        "Shoes"
      ],
      "image": "../../../../assets/brand-logo/g-star.png"
    },
    {
      "name": "Nostrum",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/nostrum.png"
    },
    {
      "name": "The Bear House",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/The-Bear-House.png"
    },
    {
      "name": "Gas",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/gap.png"
    },
    {
      "name": "Tommy Hilfiger",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/tommy-hilfiger.jpeg"
    },
    {
      "name": "Gant",
      "types": [
        "Clothes",
        "Accessories",
        "Shoes"
      ],
      "image": "../../../../assets/brand-logo/gant.png"
    },
    {
      "name": "Calvin Klein",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/calvin-klein.png"
    },
    {
      "name": "Souled Store",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/souled-store.jpeg"
    },
    {
      "name": "Louis Philippe",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/louis-philippe.png"
    },
    {
      "name": "Allen Solly",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/allen-solly.png"
    },
    {
      "name": "Converse",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/converse.png"
    },
    {
      "name": "Uniqlo",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/uniqlo.jpeg"
    },
    {
      "name": "Puma",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/puma.png"
    },
    {
      "name": "Lee",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/lee.png"
    },
    {
      "name": "Adidas",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/Adidas.png"
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
      "image": "../../../../assets/brand-logo/being-human.png"
    },
    {
      "name": "Manchester City",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/manchester.jpeg"
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
      "image": "../../../../assets/brand-logo/Caterpillar.png"
    },
    {
      "name": "Armani Exchange",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/armani-exchange.jpeg"
    },
    {
      "name": "Reebok",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/reebok.png"
    },
    {
      "name": "Pull & Bear",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/pull-bear.jpeg"
    },
    {
      "name": "H&M",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/H&M.png"
    },
    {
      "name": "Bella Vita",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/bella-vita.jpg"
    },
    {
      "name": "Westos",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/westo.png"
    },
    {
      "name": "Lee Cooper",
      "types": [
        "Clothes",
        "Shoes"
      ],
      "image": "../../../../assets/brand-logo/lee-cooper.png"
    },
    {
      "name": "Levi’s",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/levis.png"
    },
    {
      "name": "Roadstar",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/roadster.png"
    },
    {
      "name": "In Fuse",
      "types": [
        "Clothes",
        "Shoes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/infuse.png"
    },
    {
      "name": "Gap",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/gap.png"
    },
    {
      "name": "Beat London",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/beat-london.jpeg"
    },
    {
      "name": "Big Star",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/big-star.png"
    },
    {
      "name": "Skechers",
      "types": [
        "Shoes"
      ],
      "image": "../../../../assets/brand-logo/sketchers.jpeg"
    },
    {
      "name": "New Balance",
      "types": [
        "Shoes",
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/new-balance.png"
    },
    {
      "name": "Aeropostale",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/aeropostale.png"
    },
    {
      "name": "Blackberrys",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/blackberry.png"
    },
    {
      "name": "Van Heusen",
      "types": [
        "Clothes",
        "Accessories"
      ],
      "image": "../../../../assets/brand-logo/van-heusen.jpeg"
    },
    {
      "name": "Jockey",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/jockey.png"
    },
    {
      "name": "Unido",
      "types": [
        "Clothes"
      ],
      "image": "../../../../assets/brand-logo/"
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
          <div>{brandsData.length}</div>
        </div>
        <div className='brand-list' >
         {
          brandsData.map((data,index)=>{
            return(
              <div className='brand-box' >
              <img src={data.image} />
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