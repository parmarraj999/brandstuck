import React from 'react'
import './cartProduct.css'

function CartProduct() {

    return (
        <div className='item-card' >
            <div className='img-wrapper' >
                <img src='https://www.urbanmonkey.com/cdn/shop/files/um-core-vintage-dragonfly-um24a-bf-c01-xs-981401.jpg?v=1743040259&width=120' />
            </div>
            <div className='item-detail' >
                <h2>UM Core Vintage // Dragonfly</h2>
                <h2>size : L</h2>
                <h2>rs. 999</h2>
                <div className='counter-div'>
                    <div>
                        <svg style={{ width: '15px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
                    </div>
                    <h2>1</h2>
                    <div>
                        <svg style={{ width: '15px' }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"></path></svg>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartProduct