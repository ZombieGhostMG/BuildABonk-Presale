import React from 'react';
import { motion} from 'framer-motion';
import AnimatedButton from './AnimatedButton';




const cardAnimate = {
    offscreen:{ opacity:0, scale:0.5},
    onscreen:{
        opacity:1,
        scale:1,
        transition: {type:'spring',
        bounce:0.3,
        duration: 2
        }
    }
    }




const AnimatedTeamCard = (props) => {




    return (
        
        <motion.div className='flex m-3' key={props.id}
        initial={'offscreen'}
        whileInView={'onscreen'}
        viewport={{ once:true, amount:0.4 }}
        variants={cardAnimate}
        >
            <motion.div variants={cardAnimate} className=' flex-col border-2 text-center rounded-3xl py-6 pb-3 px-8 w-[260px] md:w-[300px] lg:w-[360px]' >
                
                <h3 className='text-xl font-bold py-0 text-cB'>{props.title}</h3>
                <img src={"teamImages[props.gIndex]"} alt='' className='w-[260px] md:w-[300px] lg:w-[360px] rounded-2xl my-4' />
                <h3 className='text-xl font-normal pb-2'>{props.description}</h3>
                <div className='flex h-30 py-auto px-3 md:px-5 align-end mt-7 mb-3'>
                        <AnimatedButton type="submit" text={props.title} className={"mx-auto"}/>
                </div>
                
            </motion.div>
        </motion.div>
    );
}

export default AnimatedTeamCard;