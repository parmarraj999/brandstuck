import React, { useContext, useEffect, useState } from 'react'
import './filter.css';
import { useLocation } from 'react-router-dom';
import { AllProductDataContext } from '../../../context/AllProductDataProvider';

function Filter({ setFilterPop }) {

    const categoryFilter = [
        { "text": "All" },
        { "text": "Hoodie" },
        { "text": "Sweatshirt" },
        { "text": "Shacket" },
        { "text": "Modi Jacket" },
        { "text": "Jacket" },
        { "text": "Trousers" },
        { "text": "Cargo" },
        { "text": "Jogger" },
        { "text": "Jeans" },
        { "text": "Kurta Pajama Set" },
        { "text": "Shirts" },
        { "text": "Half Shirts" },
        { "text": "Polo T-shirt" },
        { "text": "Round Neck T-shirt" },
        { "text": "Pajama" },
        { "text": "Lower" },
        { "text": "Denim Shorts" },
        { "text": "Shorts" },
        { "text": "Underwear" },
        { "text": "Innerwear" },
        { "text": "Cap" },
        { "text": "Belt" },
        { "text": "Wallet" },
        { "text": "Perfume" },
        { "text": "Shoes" },
        { "text": "Socks" }
    ]

    const sizeFilter = [
        { text: '6' },
        { text: '7' },
        { text: '8' },
        { text: '9' },
        { text: '10' },
        { text: '11' },
        { text: '12' },
        { text: 'xs' },
        { text: 's' },
        { text: 'm' },
        { text: 'l' },
        { text: 'xl' },
        { text: 'xxl' },
        { text: '28' },
        { text: '30' },
        { text: '32' },
        { text: '34' },
        { text: '36' },
        { text: '38' },
        { text: '40' },
    ]

    // const brandFilter = [
    //     { text: "Nike" },
    //     { text: "Adidas" },
    //     { text: "Levi's" },
    //     { text: "Zara" },
    //     { text: "H&M" },
    //     { text: "Uniqlo" },
    //     { text: "Gap" },
    //     { text: "Mango" },
    //     { text: "Puma" },
    //     { text: "Reebok" },
    //     { text: "Forever 21" },
    //     { text: "American Eagle" },
    //     { text: "Tommy Hilfiger" },
    //     { text: "Calvin Klein" },
    //     { text: "Ralph Lauren" },
    //     { text: "Gucci" },
    //     { text: "Prada" },
    //     { text: "Versace" },
    //     { text: "Dolce & Gabbana" },
    //     { text: "Burberry" },
    //     { text: "Armani" },
    //     { text: "Diesel" },
    //     { text: "Wrangler" },
    //     { text: "Lee" },
    //     { text: "Pepe Jeans" },
    //     { text: "Benetton" },
    //     { text: "Superdry" },
    //     { text: "Jack & Jones" },
    //     { text: "Only" },
    //     { text: "Vero Moda" },
    //     { text: "Converse" },
    //     { text: "Vans" },
    //     { text: "Sketchers" },
    //     { text: "Crocs" },
    //     { text: "Ray-Ban" },
    //     { text: "Oakley" },
    //     { text: "Casio" },
    //     { text: "Fossil" },
    //     { text: "Michael Kors" },
    //     { text: "Titan" },
    // ];

    const [searchTerm, setSearchTerm] = useState('');
    // const [filterBrand, setFilterBrand] = useState(brandFilter);

    const handleSearch = (event) => {
        const term = event.target.value;
        setSearchTerm(term);

        // const results = brandFilter.filter((item) =>
        //     item.text.toLowerCase().includes(term.toLowerCase())
        // );
        // setFilterBrand(results);
    };

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(20000);

    const handleMinChange = (event) => {
        const value = Math.min(Number(event.target.value), maxPrice);
        setMinPrice(value);
    };

    const priceFilter = [
        { text: '1000' },
        { text: '5000' },
        { text: '10000' },
        { text: '15000' },
        { text: '20000' },
    ]

    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0); // Scroll to top on route change
        }, [pathname]);

        return null;
    }

    const { AllProductList, filterProductList, setFilterProductList } = useContext(AllProductDataContext)

    const handleFilterChange = (category) => {
        // setSelectedCategory(category);
        if (category === "all") {
            setFilterProductList(AllProductList);
        } else {
            const filtered = AllProductList.filter(product => product.subCategory === category);
            setFilterProductList(filtered);
            console.log(filtered);
            setFilterPop(false)
            document.body.style.overflow = '';

        }
    };

    return (
        <div className='filter-page-container' >
            <ScrollToTop />
            <div className='filter-wrapper' >
                <div className='filter-header'>
                    <h2>Filter</h2>
                    <div onClick={() => {
                        setFilterPop(false)
                        document.body.style.overflow = '';
                    }} >
                        <svg style={{ width: "25px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                    </div>
                </div>
                <p style={{fontSize:'14px',color:"white"}}>Some Filters Is Not Working we Are Working On It!</p>
                <div className='default-box-class' >
                    <h3>Category</h3>
                    <div className='wrapper' >
                        {
                            categoryFilter.map((data) => {
                                return (
                                    <div className='box' onClick={() => handleFilterChange(data.text)} >
                                        {data.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='default-box-class' >
                    <h3>Size</h3>
                    <div className='wrapper' >
                        {
                            sizeFilter.map((data) => {
                                return (
                                    <div className='box' >
                                        {data.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
                <div className='default-box-class' >
                    <h3>Brands</h3>
                    <input
                        className='search-box'
                        placeholder='Search Brand'
                        onChange={handleSearch}
                        value={searchTerm}
                    />
                    {/* <div className='wrapper' >
                        {
                            brandFilter.map((data) => {
                                return (
                                    <div className='box' >
                                        {data.text}
                                    </div>
                                )
                            })
                        }
                    </div> */}
                </div>
                <div className='default-box-class ' >
                    <h3>Price ( up to )</h3>
                    <div className='price-wrapper' >
                        <div className='price-slider'>
                            <h4>&#8377;0</h4>
                            <input
                                type="range"
                                min="0"
                                max={maxPrice}
                                value={minPrice}
                                onChange={handleMinChange}
                            />
                            <h4>&#8377;20000</h4>
                        </div>
                        <div className='price-show' >
                            <div>&#8377; {minPrice}</div>
                        </div>
                    </div>
                    <div className='wrapper' >
                        {
                            priceFilter.map((data) => {
                                return (
                                    <div className='box' onClick={() => setMinPrice(data.text)} >
                                        &#8377; {data.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter