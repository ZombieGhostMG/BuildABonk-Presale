import React from 'react';
import { motion } from 'framer-motion';

const titleAnimate = {
    offscreen:{opacity:0, scale:0.7},
    onscreen:{
        opacity:1,
        scale:1,
        transition: {type:'spring',
        bounce:0.5,
        duration: 1.5
        }
    }
}


const AnimatedOnViewTitleMd = (props) => {
    return (
            <motion.h1
            initial={'offscreen'}
            whileInView={'onscreen'}
            viewport={{ once:true, amount:1 }}
            
            variants={titleAnimate} className={`py-4 text-4xl sm:text-5xl md:text-7xl font-semibold ${props.className}`}>
                    {props.text}
            </motion.h1>
    );
}

export default AnimatedOnViewTitleMd;
