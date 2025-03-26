import React from 'react'
import './footer.css'
import { Link } from 'react-router-dom'

function Footer() {
    return (
        <div className='footer-container' >
            <div className='box-one' >
                <div>
                    <h3> Your ultimate destination for diverse,<br />
                        quality brands.</h3>
                    <h2>Brandstuck1@gmail.com</h2>
                </div>
                <div className='dialog-box' >
                    <h5>Go <br /> Shopping</h5>
                    <button>Shopping</button>
                </div>
            </div>
            <div className='box-two' >
                <ul>
                    <Link className='item'>Products</Link>
                    <Link className='item'>Brand</Link>
                    <Link className='item'>Contact Us</Link>
                </ul>
                <div className='detail-box' >
                    <div>
                        <h6>Store</h6>
                        <p>Main road, Narsinghpur <br /> Madhya pradesh , 487001</p>
                    </div>
                    <div>
                        <h6>Contact No.</h6>
                        <p>1234567890 <br /> 1234567890</p>
                    </div>
                </div>
            </div>
            <h1>brand<span>stuck</span></h1>
            <div className='box' >
                Copyright @ BrandStuck 2025
            </div>
        </div>
    )
}

export default Footer