import React, { useContext, useEffect, useState } from 'react'
import './shop.css';
import { Link } from 'react-router-dom';
import ProductCard from './product-card/productCard';
import Filter from './filters/filter';
import { AllProductDataContext } from '../../../context/AllProductDataProvider';

function Shop() {

    const [current, setCurrent] = useState('See All')
    const filterList = [
        { text: 'See All' },
        { text: 'T-Shirt' },
        { text: 'Shirts' },
        { text: 'Kurta' },
        { text: 'Paijama' },
        { text: 'Jacket' },
    ]

    const [grid, setGrid] = useState('4')
    const [filterPop, setFilterPop] = useState(false)

    const {AllProductList} = useContext(AllProductDataContext)

    const data = [
        {
            "product_id": "CLO123",
            "name": "Classic Cotton T-Shirt",
            "category": "Tops",
            "subcategory": "T-Shirts",
            "price": 19.99,
            "currency": "USD",
            "color": "Navy",
            "size": ["S", "M", "L", "XL"],
            "material": "100% Cotton",
            "rating": 4.5,
            "image_url": "https://i.pinimg.com/474x/76/fc/96/76fc96a4faffb70395b3e22e6dda9044.jpg"
        },
        {
            "product_id": "CLO456",
            "name": "Slim Fit Jeans",
            "category": "Bottoms",
            "subcategory": "Jeans",
            "price": 49.99,
            "currency": "USD",
            "color": "Dark Wash",
            "size": ["30", "32", "34", "36"],
            "material": "Denim",
            "rating": 4.2,
            "image_url": "https://i.pinimg.com/474x/ea/37/2b/ea372bfe8bdcf776d92b601f018e875e.jpg"
        },
        {
            "product_id": "CLO789",
            "name": "Summer Floral Dress",
            "category": "Dresses",
            "subcategory": "Casual Dresses",
            "price": 39.99,
            "currency": "USD",
            "color": "Multicolor",
            "size": ["XS", "S", "M", "L"],
            "material": "Rayon",
            "rating": 4.8,
            "image_url": "https://i.pinimg.com/474x/a6/f9/e1/a6f9e1c5fd99c67249a4901f9c4172fc.jpg"
        },
        {
            "product_id": "CLO101",
            "name": "Hooded Sweatshirt",
            "category": "Outerwear",
            "subcategory": "Sweatshirts",
            "price": 34.99,
            "currency": "USD",
            "color": "Gray",
            "size": ["M", "L", "XL", "XXL"],
            "material": "Fleece",
            "rating": 4.0,
            "image_url": "https://i.pinimg.com/474x/e8/92/ad/e892add9fed3838e44e75a5d39e905ac.jpg"
        },
        {
            "product_id": "CLO112",
            "name": "Leather Belt",
            "category": "Accessories",
            "subcategory": "Belts",
            "price": 24.99,
            "currency": "USD",
            "color": "Brown",
            "size": ["32", "34", "36", "38"],
            "material": "Leather",
            "rating": 4.6,
            "image_url": "https://i.pinimg.com/474x/5b/99/55/5b9955c269902089ee6b085fa06d7e01.jpg"
        },
        {
            "product_id": "CLO113",
            "name": "Striped Polo Shirt",
            "category": "Tops",
            "subcategory": "Polo Shirts",
            "price": 29.99,
            "currency": "USD",
            "color": "Blue/White",
            "size": ["S", "M", "L", "XL"],
            "material": "Cotton Blend",
            "rating": 4.3,
            "image_url": "https://i.pinimg.com/474x/f7/7d/30/f77d30055d4176eec83d17c6c81372a6.jpg"
        },
        {
            "product_id": "CLO114",
            "name": "Chino Shorts",
            "category": "Bottoms",
            "subcategory": "Shorts",
            "price": 32.50,
            "currency": "USD",
            "color": "Beige",
            "size": ["30", "32", "34", "36"],
            "material": "Cotton",
            "rating": 4.1,
            "image_url": "https://i.pinimg.com/474x/59/92/a0/5992a0ba0358b65644740431e261901e.jpg"
        },
        {
            "product_id": "CLO116",
            "name": "Winter Parka",
            "category": "Outerwear",
            "subcategory": "Jackets",
            "price": 89.99,
            "currency": "USD",
            "color": "Olive",
            "size": ["M", "L", "XL", "XXL"],
            "material": "Polyester",
            "rating": 4.4,
            "image_url": "https://example.com/images/parka_olive.jpg"
        },
        {
            "product_id": "CLO117",
            "name": "Wool Scarf",
            "category": "Accessories",
            "subcategory": "Scarves",
            "price": 18.99,
            "currency": "USD",
            "color": "Red",
            "size": ["One Size"],
            "material": "Wool",
            "rating": 4.7,
            "image_url": "https://example.com/images/scarf_red.jpg"
        },
        {
            "product_id": "CLO118",
            "name": "Graphic Print Tee",
            "category": "Tops",
            "subcategory": "T-Shirts",
            "price": 22.99,
            "currency": "USD",
            "color": "White",
            "size": ["S", "M", "L", "XL"],
            "material": "Cotton",
            "rating": 4.5,
            "image_url": "https://example.com/images/tee_graphic.jpg"
        },
        {
            "product_id": "CLO119",
            "name": "Cargo Pants",
            "category": "Bottoms",
            "subcategory": "Pants",
            "price": 45.00,
            "currency": "USD",
            "color": "Khaki",
            "size": ["30", "32", "34", "36"],
            "material": "Cotton Blend",
            "rating": 4.2,
            "image_url": "https://example.com/images/pants_cargo.jpg"
        },
        {
            "product_id": "CLO120",
            "name": "Maxi Dress",
            "category": "Dresses",
            "subcategory": "Casual Dresses",
            "price": 42.99,
            "currency": "USD",
            "color": "Pink",
            "size": ["XS", "S", "M", "L"],
            "material": "Polyester",
            "rating": 4.8,
            "image_url": "https://example.com/images/dress_maxi.jpg"
        },
        {
            "product_id": "CLO121",
            "name": "Denim Jacket",
            "category": "Outerwear",
            "subcategory": "Jackets",
            "price": 59.99,
            "currency": "USD",
            "color": "Light Wash",
            "size": ["M", "L", "XL", "XXL"],
            "material": "Denim",
            "rating": 4.3,
            "image_url": "https://example.com/images/jacket_denim.jpg"
        },
        {
            "product_id": "CLO122",
            "name": "Baseball Cap",
            "category": "Accessories",
            "subcategory": "Hats",
            "price": 15.99,
            "currency": "USD",
            "color": "Black",
            "size": ["One Size"],
            "material": "Cotton",
            "rating": 4.6,
            "image_url": "https://example.com/images/cap_baseball.jpg"
        },
        {
            "product_id": "CLO124",
            "name": "Linen Shirt",
            "category": "Tops",
            "subcategory": "Shirts",
            "price": 36.99,
            "currency": "USD",
            "color": "Light Blue",
            "size": ["S", "M", "L", "XL"],
            "material": "Linen",
            "rating": 4.4,
            "image_url": "https://example.com/images/shirt_linen.jpg"
        },
        {
            "product_id": "CLO125",
            "name": "Dress Pants",
            "category": "Bottoms",
            "subcategory": "Pants",
            "price": 55.00,
            "currency": "USD",
            "color": "Charcoal",
            "size": ["30", "32", "34", "36"],
            "material": "Wool Blend",
            "rating": 4.7,
            "image_url": "https://example.com/images/pants_dress.jpg"
        },
        {
            "product_id": "CLO126",
            "name": "Cocktail Dress",
            "category": "Dresses",
            "subcategory": "Formal Dresses",
            "price": 95.00,
            "currency": "USD",
            "color": "Red",
            "size": ["XS", "S", "M", "L"],
            "material": "Satin",
            "rating": 4.9,
            "image_url": "https://example.com/images/dress_cocktail.jpg"
        },
        {
            "product_id": "CLO127",
            "name": "Leather Jacket",
            "category": "Outerwear",
            "subcategory": "Jackets",
            "price": 150.00,
            "currency": "USD",
            "color": "Black",
            "size": ["M", "L", "XL", "XXL"],
            "material": "Leather",
            "rating": 4.8,
            "image_url": "https://example.com/images/jacket_leather.jpg"
        },
        {
            "product_id": "CLO128",
            "name": "Knit Gloves",
            "category": "Accessories",
            "subcategory": "Gloves",
            "price": 12.99,
            "currency": "USD",
            "color": "Gray",
            "size": ["One Size"],
            "material": "Knit",
            "rating": 4.5,
            "image_url": "https://example.com/images/gloves_knit.jpg"
        }
    ]

    const width = window.innerWidth;

    useEffect(() => {
        if (width < 765) {
            setGrid(2)
        } else {
            setGrid(4)
        }
    }, [])


    return (
        <div className='shop-container' >
            {/* open filter popup  */}
            {
                filterPop ?
                    <Filter setFilterPop={setFilterPop} />
                    : ""
            }

            {/* open add to cart popup  */}

            <div style={{ display: "flex", alignItems: 'center', gap: "1rem" }}>
                <Link to='/' style={{ fontSize: '16px', textDecoration: "none", fontWeight: "600", color: "rgba(0,0,0,.4)" }}> Home </Link>
                <svg style={{ width: "20px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M1.99974 13.0001L1.9996 11.0002L18.1715 11.0002L14.2218 7.05044L15.636 5.63623L22 12.0002L15.636 18.3642L14.2218 16.9499L18.1716 13.0002L1.99974 13.0001Z"></path></svg>
                <h3>Shopping Page</h3>
            </div>
            <h1 className='shop-heading' >All Products</h1>
            <div className='filter-tag-container' >
                {
                    filterList.map((data) => {
                        return (
                            <div className='filter-tag' style={data.text === current ? { background: "black", color: "white" } : {}} onClick={() => setCurrent(data.text)}>
                                {data.text}
                            </div>
                        )
                    })
                }
            </div>
            <div className='functional-header' >
                <button className='filter-button' onClick={() => {
                    setFilterPop(true)
                    document.body.style.overflow = 'hidden'
                }}>
                    <svg style={{ width: '20px', height: '20px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M6.17071 18C6.58254 16.8348 7.69378 16 9 16C10.3062 16 11.4175 16.8348 11.8293 18H22V20H11.8293C11.4175 21.1652 10.3062 22 9 22C7.69378 22 6.58254 21.1652 6.17071 20H2V18H6.17071ZM12.1707 11C12.5825 9.83481 13.6938 9 15 9C16.3062 9 17.4175 9.83481 17.8293 11H22V13H17.8293C17.4175 14.1652 16.3062 15 15 15C13.6938 15 12.5825 14.1652 12.1707 13H2V11H12.1707ZM6.17071 4C6.58254 2.83481 7.69378 2 9 2C10.3062 2 11.4175 2.83481 11.8293 4H22V6H11.8293C11.4175 7.16519 10.3062 8 9 8C7.69378 8 6.58254 7.16519 6.17071 6H2V4H6.17071ZM9 6C9.55228 6 10 5.55228 10 5C10 4.44772 9.55228 4 9 4C8.44772 4 8 4.44772 8 5C8 5.55228 8.44772 6 9 6ZM15 13C15.5523 13 16 12.5523 16 12C16 11.4477 15.5523 11 15 11C14.4477 11 14 11.4477 14 12C14 12.5523 14.4477 13 15 13ZM9 20C9.55228 20 10 19.5523 10 19C10 18.4477 9.55228 18 9 18C8.44772 18 8 18.4477 8 19C8 19.5523 8.44772 20 9 20Z"></path></svg>
                    Filter
                </button>
                {/* 
                <div className='grid-button' >
                    <h1>Grid</h1>
                    <div className='line' ></div>
                    <h2 style={grid === '2' ? { color: "black" } : {}}
                        onClick={() => setGrid('2')}
                    >2</h2>
                    <h2 style={grid === '4' ? { color: "black" } : {}}
                        onClick={() => setGrid('4')}>4</h2>
                    <h2 style={grid === '6' ? { color: "black" } : {}}
                        onClick={() => setGrid('6')}>6</h2>
                </div> */}

            </div>
            <div className='product-list' style={{ gridTemplateColumns: `repeat(${grid},1fr)` }} >
                {
                    AllProductList.map((data) => {
                        return (
                            <ProductCard data={data} grid={grid} />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Shop