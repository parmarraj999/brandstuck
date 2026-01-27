import React, { useEffect } from 'react';
import './Loader.css';
import gsap from 'gsap';

const Loader = () => {
    useEffect(() => {
        const tl = gsap.timeline();

        // Animate the brand name text
        tl.fromTo('.loader-content h1 span',
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power4.out' }
        );

        // Initial scale up effect
        // tl.to('.loader-container', {
        //     clipPath: 'circle(150% at 50% 50%)',
        //     duration: 1.5,
        //     ease: 'power2.inOut'
        // }, '-=0.5');

        return () => tl.kill();
    }, []);

    return (
        <div className="loader-container">
            <div className="loader-content">
                <h1>
                    <span>B</span>
                    <span>r</span>
                    <span>a</span>
                    <span>n</span>
                    <span>d</span>
                    <span>S</span>
                    <span>t</span>
                    <span>u</span>
                    <span>c</span>
                    <span>k</span>
                </h1>
                <div className="loader-line"></div>
            </div>
        </div>
    );
};

export default Loader;
