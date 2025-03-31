import React from 'react'
import './text.css';
import {useEffect,useState} from "react";
import {motion,useScroll} from "framer-motion"  ;



function Text() {

    const paragraph = "Brandstuck Your one-stop shop for the hottest styles and must-have brands, all under one roof.  Discover a curated collection of apparel, accessories, and more, at prices you'll love.  Find your perfect look today at Brandstuck!"

    const words = paragraph.split(" ");


    const {scrollYProgress} = useScroll({
      target: Element,
      offset:['start 0.9', 'start 0.25']
    });
    const[progress,setProgress] = useState(0);

    return (
        <div className='text-container' >
          <h2>
         {words.map((data,key)=>{
         const start= key/words.length;
         const end = start + (1/words.length);
         const opacity = progress >= start ? (progress <= end ? (progress - start) / (end - start) : 1) : 0.3;
            return <motion.span key={key} 
            style={{opacity}}  >{data}</motion.span>
         })}
          </h2>
        </div>
    )
}

export default Text