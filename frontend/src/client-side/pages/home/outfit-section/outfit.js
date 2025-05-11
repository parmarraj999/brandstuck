import React from 'react'
import './outfit.css'

function Outfit() {

    const data = [
        {
            name: 'perfume',
            img: '../../../../assets/images/perfume.png',
            link: ""
        },
        {
            name: 'caps',
            img: '../../../../assets/images/cap.png',
            link: ""
        },
        {
            name: 'jacket',
            img: '../../../../assets/images/jacket.png',
            link: ""
        },
        {
            name: 'belts',
            img: '../../../../assets/images/belt.png',
            link: ""
        },
        {
            name: 'kurtas',
            img: '../../../../assets/images/kurta.png',
            link: ""
        },
        {
            name: 'shorts',
            img: '../../../../assets/images/short.png',
            link: ""
        },
    ]

    return (
        <div className='outfit-container' >
            <div className='grid-container' >
                <div className='row-one' >
                    <div className='column-one' >
                        <div className='image-container' >
                            <img className='image' src={data[0].img} />
                            <div className='detail' >
                                <h3>{data[0].name}</h3>
                                <svg style={{ width: '20px', color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                            </div>
                        </div>
                        <div className='image-container'>
                            <img className='image' src={data[1].img} />
                            <div className='detail' >
                                <h3>{data[1].name}</h3>
                                <svg style={{ width: '20px', color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className='column-two' >
                        <div className='image-container'>
                            <img className='image' src={data[2].img} />
                            <div className='detail' >
                                <h3>{data[2].name}</h3>
                                <svg style={{ width: '20px', color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='row-two' >
                    <div className='image-container'>
                        <img className='image' src={data[3].img} />
                        <div className='detail' >
                            <h3>{data[3].name}</h3>
                            <svg style={{ width: '20px', color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                        </div>
                    </div>
                </div>
                <div className='row-three' >
                    <div className='column-one' >
                        <div className='image-container'>
                            <img className='image' src={data[4].img} />
                            <div className='detail' >
                                <h3>{data[4].name}</h3>
                                <svg style={{ width: '20px', color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                            </div>
                        </div>
                    </div>
                    <div className='column-two' >
                        <div className='image-container'>
                            <img className='image' src={data[5].img} />
                            <div className='detail' >
                                <h3>{data[5].name}</h3>
                                <svg style={{ width: '20px', color: "white" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M13.1717 12.0007L8.22192 7.05093L9.63614 5.63672L16.0001 12.0007L9.63614 18.3646L8.22192 16.9504L13.1717 12.0007Z"></path></svg>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Outfit