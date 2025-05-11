import React from 'react';
import './map.css';



function Map() {

    return (
        <div className='map-container' >
            <h1 className='section-heading'>Our Location</h1>
            <iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d944.5727811059779!2d79.19904123669787!3d22.945466365558815!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjLCsDU2JzQ0LjEiTiA3OcKwMTEnNTcuNyJF!5e0!3m2!1sen!2sin!4v1742999345825!5m2!1sen!2sin" width="90%" height="80%" className='map' allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <a href='https://www.google.com/maps/place/22%C2%B05644.0%22N+79%C2%B01157.7%22E/@22.9452906,79.1994005,18z/data=!4m13!1m8!3m7!1s0x397f9cc964674e61:0xcb3415e80e7087db!2sNarsinghpur,+Madhya+Pradesh!3b1!8m2!3d22.9473179!4d79.1923266!16zL20vMDNuNmNu!3m3!8m2!3d22.945545!4d79.199368?entry=ttu&g_ep=EgoyMDI1MDMyMy4wIKXMDSoASAFQAw%3D%3D' className='shop-btn' style={{ marginTop: '2rem' }}>Location
                <svg style={{ width: "30px" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
            </a>
        </div>
    )
}

export default Map