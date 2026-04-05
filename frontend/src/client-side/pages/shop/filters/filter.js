import React, { useContext, useEffect, useState } from 'react'
import './filter.css';
import { useLocation } from 'react-router-dom';
import { AllProductDataContext } from '../../../context/AllProductDataProvider';

function Filter({ setFilterPop }) {

    const categoryFilter = [
        { "text": "All" },
        { "text": "Hoodies" },
        { "text": "Sweatshirts" },
        { "text": "Shackets" },
        { "text": "Jacket" },
        { "text": "Trousers" },
        { "text": "Cargo" },
        { "text": "Jogger" },
        { "text": "Jeans" },
        { "text": "Kurta" },
        { "text": "Shirts" },
        { "text": "Half Shirts" },
        { "text": "Polo T-shirt" },
        { "text": "Round Neck T-shirt" },
        { "text": "Pajama" },
        { "text": "Track Pants" },
        { "text": "Denim Shorts" },
        { "text": "Shorts" },
        { "text": "Underwear" },
        { "text": "Innerwear" },
        { "text": "Cap" },
        { "text": "Belts" },
        { "text": "Wallet" },
        { "text": "Perfume" },
        { "text": "Watches" },
        { "text": "Glares" },
        { "text": "Bag" },
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


    function ScrollToTop() {
        const { pathname } = useLocation();

        useEffect(() => {
            window.scrollTo(0, 0); // Scroll to top on route change
        }, [pathname]);

        return null;
    }

    const {
        filters,
        setFilters,
        fetchProducts,
        resetPagination
    } = useContext(AllProductDataContext);

    const [tempFilters, setTempFilters] = useState({ ...filters });

    const handleFilterSelection = (type, value) => {
        setTempFilters(prev => ({
            ...prev,
            [type]: prev[type] === value ? null : value // Toggle filter
        }));
    };

    const handleApply = async () => {
        setFilters(tempFilters);
        resetPagination();
        setFilterPop(false);
        document.body.style.overflow = '';
        // fetchProducts will be triggered by useEffect in Provider if we move the fetch there, 
        // but for now, we'll call it manually after state update or rely on the user clicking.
        // Actually, since setState is async, we should ideally trigger fetch in a useEffect in the provider.
    };

    useEffect(() => {
        if (filters !== tempFilters) {
            setTempFilters(filters);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    // Re-fetch when filters change (Ideally in Provider, but let's ensure it happens)
    useEffect(() => {
        fetchProducts("next");
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filters]);

    const handleClearAll = () => {
        const cleared = {
            subCategory: null,
            brand: null,
            size: null,
            minPrice: 0,
            maxPrice: 20000
        };
        setFilters(cleared);
        setTempFilters(cleared);
        resetPagination();
    };

    const handlePriceChange = (e) => {
        setTempFilters(prev => ({ ...prev, minPrice: Number(e.target.value) }));
    };

    return (
        <div className='filter-page-container' >
            <ScrollToTop />
            <div className='filter-wrapper' >
                <div className='filter-header'>
                    <h2>Filter</h2>
                    <div className='header-actions' style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        <button className='clear-btn' onClick={handleClearAll} style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>Clear All</button>
                        <div onClick={() => {
                            setFilterPop(false)
                            document.body.style.overflow = '';
                        }} style={{ cursor: 'pointer' }}>
                            <svg style={{ width: "25px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9997 10.5865L16.9495 5.63672L18.3637 7.05093L13.4139 12.0007L18.3637 16.9504L16.9495 18.3646L11.9997 13.4149L7.04996 18.3646L5.63574 16.9504L10.5855 12.0007L5.63574 7.05093L7.04996 5.63672L11.9997 10.5865Z"></path></svg>
                        </div>
                    </div>
                </div>

                <div className='default-box-class' >
                    <h3>Category</h3>
                    <div className='wrapper' >
                        {
                            categoryFilter.map((data) => {
                                const isSelected = tempFilters.subCategory === data.text;
                                return (
                                    <div
                                        key={data.text}
                                        className='box'
                                        style={isSelected ? { background: 'black', color: 'white' } : {}}
                                        onClick={() => handleFilterSelection('subCategory', data.text)}
                                    >
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
                                const isSelected = tempFilters.size === data.text;
                                return (
                                    <div
                                        key={data.text}
                                        className='box'
                                        style={isSelected ? { background: 'black', color: 'white' } : {}}
                                        onClick={() => handleFilterSelection('size', data.text)}
                                    >
                                        {data.text}
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div className='default-box-class' >
                    <h3>Price Range</h3>
                    <div className='price-wrapper' >
                        <div className='price-slider'>
                            <h4>&#8377;0</h4>
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                value={tempFilters.minPrice}
                                onChange={handlePriceChange}
                                style={{ accentColor: 'black' }}
                            />
                            <h4>&#8377;10000</h4>
                        </div>
                        <div className='price-show' >
                            <div>&#8377; {tempFilters.minPrice} - &#8377; 10000</div>
                        </div>
                    </div>
                </div>

                <button
                    className='apply-filters-btn'
                    onClick={handleApply}
                    style={{
                        padding: '1rem',
                        background: 'white',
                        color: 'black',
                        border: 'none',
                        borderRadius: '10px',
                        fontSize: '18px',
                        fontWeight: 600,
                        marginTop: '1rem',
                        cursor: 'pointer'
                    }}
                >
                    Apply Filters
                </button>
            </div>
        </div>
    )
}

export default Filter;