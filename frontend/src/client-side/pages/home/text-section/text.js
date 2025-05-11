import React, { useRef } from 'react';
import './text.css';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function Text() {
    const textRef = useRef(null);

    useGSAP(() => {
        gsap.fromTo(
          Array.from(textRef.current.children).slice(0, -1),
            { color: '#aaa' },
            {
                color: '#000',
                scrollTrigger: {
                    trigger: textRef.current,
                    start: 'top 80%',
                    end: 'bottom 50%',
                    scrub: true,
                },
                stagger: 0.1,
            }
        );
    }, []);

    const paragraph = "Brandstuck Your one-stop shop for the hottest styles and must-have brands, all under one roof. Discover a curated collection of apparel, accessories, and more, at prices you'll love. Find your perfect look today at Brandstuck!";
    const words = paragraph.split(" ");

    return (
        <div className='text-container'>
            <h2 ref={textRef}>
                {words.map((word, index) => (
                    <span key={index}
                    style={{ marginRight: '5px', color: (index === words.length - 1) ? '#000' : 'inherit' }}
                    >{word}   </span>
                  ))}
            </h2>
            
          
        </div>
    );
}

export default Text;
