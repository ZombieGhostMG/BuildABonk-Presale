import React from "react"
import { motion } from "framer-motion"

const canvasAnimations = {
    initial: { scale: 1, opacity: 0 },
    animate: {scale: 1, opacity: 1, transition: {delay: 2, duration:1.5}},
    exit: { scale: 1, opacity: 0 },

}

const AnimatedCanvas = ({children}) => {
    return (
        
        <motion.div className=" w-[100vw] h-[100%] overflow-hidden absolute" variants={canvasAnimations} initial='initial' animate='animate' exit='exit'>
            {children}
        </motion.div>
        
    )
}

export default AnimatedCanvas