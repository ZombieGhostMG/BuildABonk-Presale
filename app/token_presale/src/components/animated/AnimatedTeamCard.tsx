import React from 'react';
import { motion} from 'framer-motion';
// import teamImages from '../team/teamImages';
import { FaTwitterSquare, FaDiscord} from "react-icons/fa";



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

    // async function sequence() {
    //     await animation.start({ rotateY:90, transition: {duration:0.4} })
    //     setIsRevealed(prevRevealed => !prevRevealed);
    //     await animation.start({ rotateY:0, transition: {duration:0.4} })
    //     animation.start({ rotateY:0 })
    // }


    return (
        
        <motion.div className='flex m-3' key={props.id}
        initial={'offscreen'}
        whileInView={'onscreen'}
        viewport={{ once:true, amount:0.4 }}
        variants={cardAnimate}
        >
            <motion.div variants={cardAnimate} className=' flex-col border-2 text-center rounded-3xl py-6 pb-3 px-8 w-[260px] md:w-[300px] lg:w-[360px]' >
                
                <h3 className='text-xl font-bold py-0'>{props.nickname}</h3>
                <img src={"teamImages[props.gIndex]"} alt='' className='w-[260px] md:w-[300px] lg:w-[360px] rounded-2xl my-4' />
                <h3 className='text-xl font-normal pb-2'>{props.role}</h3>
                <FaDiscord size={50} className='text-cB  cursor-pointer p-1 mx-1 mt-1 mb-0 inline-block hover:text-[#f4f4f4] duration-300' onClick={() => window.open(props.discordLink, "_blank")}/>
                <FaTwitterSquare size={50} className='text-cB cursor-pointer p-1 mx-1 mt-1 mb-0 inline-block hover:text-[#f4f4f4] transition-all duration-300' onClick={() => window.open(props.twitterLink, "_blank")}/>
                
                {/* <AnimatedButton text={isRevealed ? 'Back' : 'Reveal'} className='text-2xl  ' onClick={toggleIsRevealed} /> */}
                {/* <motion.p>
                    {props.text}
                </motion.p> */}
            </motion.div>
        </motion.div>
    );
}

export default AnimatedTeamCard;