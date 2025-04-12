import React from 'react'
import './brandList.css'
import { Link } from 'react-router-dom'

function BrandList() {

    const data = [
        {
            img: '../../../../assets/images/brand-1.png'
        },
        {
            img: '../../../../assets/images/brand-2.png'
        },
        {
            img: '../../../../assets/images/brand-3.png'
        },
        {
            img: '../../../../assets/images/brand-4.png'
        },
        {
            img: '../../../../assets/images/brand-5.png'
        },
        {
            img: '../../../../assets/images/brand-6.png'
        },
    ]

    return (
        <div className='brand-list-container' >
            <h1 className='section-heading' >Brands</h1>
            {/* <div className='brand-wrapper' >
                {
                    data.map((data) => {
                        return (
                            <div className='brand-card' >
                                <img src={data.img} />
                            </div>
                        )
                    })
                }
            </div> */}
            <div class="stock-ticker">
                <ul>
                    {
                        data.map((data) => {
                            return (
                                <li className='brand-card' >
                                    <img src={data.img} />
                                </li>
                            )
                        })
                    }
                </ul>

                <ul aria-hidden="true">
                    {
                        data.map((data) => {
                            return (
                                <li className='brand-card' >
                                    <img src={data.img} />
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
            <Link to='/brands' style={{textDecoration:"none"}} className='default-button' >All Brands</Link>
        </div>
    )
}

export default BrandList