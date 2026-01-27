import React from 'react'
import './category.css'
import { useNavigate } from 'react-router-dom'

function Category() {

    const navigate = useNavigate();

    const data = [
        {
            name: 'Cap',
            img: 'https://i.pinimg.com/736x/0a/2a/77/0a2a7758090ff5817b69e85a042a09a9.jpg'
        },
        {
            name: 'Perfume',
            img: 'https://i.pinimg.com/474x/b8/65/a8/b865a87acf3f44040763054260464cfe.jpg',
        },
        {
            name: 'Innerwear',
            img: 'https://i.pinimg.com/474x/89/8d/be/898dbedf746ccaa42496b214cd59049b.jpg',
        },
        {
            name: 'Round Neck T-shirt',
            img: 'https://i.pinimg.com/474x/fe/4a/7a/fe4a7aaa09f7ab7e88928032d261cc49.jpg',
        },
        {
            name: 'Polo T-shirt',
            img: 'https://i.pinimg.com/474x/5c/97/40/5c9740bf3ffb0afa55de057bc365bb95.jpg',
        },
        {
            name: 'Half Shirts',
            img: 'https://i.pinimg.com/474x/77/31/08/773108b1b7db72687cd24f87b36e2106.jpg',
        },
        {
            name: 'Shirts',
            img: 'https://i.pinimg.com/474x/cc/e4/cb/cce4cbb7dc8ae3ef8ee1f0723b86c3ce.jpg',
        },
        {
            name: 'Shackets',
            img: 'https://i.pinimg.com/474x/85/f2/73/85f27331ebc68dd4681090444583cc38.jpg',
        },
        {
            name: 'Sweatshirts',
            img: 'https://i.pinimg.com/474x/d7/36/ad/d736ad4c0542de93e7566b87e1f255a2.jpg',
        },
        {
            name: 'Hoodies',
            img: 'https://i.pinimg.com/474x/22/cc/0c/22cc0c84a47b65117deadebf227863ce.jpg',
        },
        {
            name: 'Kurta',
            img: 'https://i.pinimg.com/474x/ff/c7/00/ffc700489a84f92461850056ee7021ea.jpg',
        },
        {
            name: 'Belts',
            img: 'https://i.pinimg.com/474x/df/2a/a1/df2aa1efa77ada7a774c2a682d3431b7.jpg',
        },
        {
            name: 'Trousers',
            img: 'https://i.pinimg.com/474x/21/56/7c/21567c756dcce73053fec7a04a6a6101.jpg',
        },
        {
            name: 'Jeans',
            img: 'https://i.pinimg.com/474x/5f/47/a7/5f47a736d11efc985e48252bd8e0a369.jpg',
        },
        {
            name: 'Jogger',
            img: 'https://i.pinimg.com/474x/dc/ff/48/dcff489eea54a8f934a4c9fde0009a8d.jpg',
        },
        {
            name: 'Denim Shorts',
            img: 'https://i.pinimg.com/474x/8f/6b/e3/8f6be3edcd8c0f1501d091097d25b132.jpg',
        },
        {
            name: 'Shorts',
            img: 'https://i.pinimg.com/474x/5b/45/5c/5b455c3bc1b6514e327fb3d28e0d8594.jpg',
        },
        {
            name: 'Pajama',
            img: 'https://i.pinimg.com/474x/a9/a0/27/a9a02710d58bd2d2f5886e8080c1efac.jpg',
        },
        {
            name: 'Socks',
            img: 'https://i.pinimg.com/474x/5c/d7/40/5cd740d2dcba90f7d5abf8df533624f1.jpg',
        },
        {
            name: 'Shoes',
            img: 'https://i.pinimg.com/474x/cf/4e/51/cf4e51aab3596b4b415c6a356dd76a80.jpg',
        },
        {
            name: 'Wallet',
            img: 'https://i.pinimg.com/474x/d2/0f/b3/d20fb322f6edae48eb0beb4c24b33252.jpg',
        },
    ]

    return (
        <div className='category-container' >
            <h1 className='section-heading' >Category</h1>
            <div className='category-wrapper' >
                {
                    data.map((item, index) => {
                        return (
                            <div className='category-card' key={index} onClick={() => navigate('/shop', { state: { category: item.name } })} style={{ cursor: 'pointer' }}>
                                <img src={item.img} alt='category' className='category-img' />
                                <h3 className='category-name' >{item.name}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Category