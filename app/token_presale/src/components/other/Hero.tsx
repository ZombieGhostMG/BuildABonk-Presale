import React from 'react';
// import heroBG from '../../../public/images/heroImages/bg.webp';
// import Moon1 from '../../../public/images/heroImages/Moon1.webp';
// import Ghost1 from '../../../public/images/heroImages/Ghost2.webp';
// import Guardian1 from '../../../public/images/heroImages/Guardian2.webp';
import { motion, useScroll, useTransform } from 'framer-motion';

const ghostsAnimate = {
  offscreen:{y: 200, scale: 0.5, opacity: 0},
  onscreen:{
      y: 0,
      scale: 1,
      opacity: 1,
      transition: {
      duration: 0.5,
      ease: 'easeOut',
      delay: 2
      }
  }
}
const moonAnimate = {
  offscreen:{x: -200, scale: 0.8, opacity: 0},
  onscreen:{
      x: 0,
      scale: 1,
      opacity: 1,
      transition: {
      duration: 1.5,
      ease: 'easeOut',
      delay: 2
      }
  }
}

const Hero = () => {

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 1500], [0, -900]);
  const y3 = useTransform(scrollY, [0, 1500], [0, -900]);


  return (
    <>
    <div className='w-full h-[84vh] md:h-[90vh] lg:h-[94vh] relative '>
      {/* <video
        className='object-cover h-full w-full absolute -z-10 '
        src={planet}
        autoPlay
        loop
        muted
      /> */}
      <img
        className='object-cover h-full w-full absolute z-0 pointer-events-none '
        src={'/images/heroImages/bg.webp'} alt=''
      />
      <motion.img className='absolute top-[1%] md:top-[3%] lg:left-[6%] z-0 w-[240px] md:w-[40vw] pointer-events-none' style={{ y: y1}} src={'/images/heroImages/Moon1.webp'} alt=''
      initial={'offscreen'}
      animate={'onscreen'} 
      variants={moonAnimate}
      viewport={{ once:true, amount:0 }}/>

      <motion.img className='absolute top-[60%] md:top-[45%] right-[8%] md:right-[20%] z-0 w-[200px] md:w-[300px] pointer-events-none' style={{ y: y2}} src={'/images/heroImages/Ghost2.webp'} alt=''
       initial={'offscreen'}
       animate={'onscreen'} 
       variants={ghostsAnimate}
       viewport={{ once:true, amount:0 }}/>

      <motion.img className='absolute top-[85%] md:top-[70%] right-[7%] md:right-[18%] z-0 w-[70px] md:w-[100px] pointer-events-none' style={{ y: y3}} src={'/images/heroImages/Guardian2.webp'} alt=''/>


      <div className='w-full h-[90%] flex flex-col justify-center items-center text-cC px-4 text-center z-20 text-3xl sm:text-4xl md:text-6xl'>
        {/* <img className=' h-[200px] sm:h-[40vh] sm:max-h-[500px] w-[200px] sm:w-auto pointer-events-none self-center mx-auto z-10 opacity-60'
          src={MGLogo} alt=''
        /> */}
        <h1 className='z-20 font-light '> <span className='blue z-20 font-bold'>Ghosts</span> Going To</h1>
        <h1 className='py-2 z-20 font-light'>
          The <span className='blue z-20 font-bold'>Moon</span>
        </h1>
        {/* <p className='text-xl  md:text-2xl py-4 z-20'>
          Get paid to game.
        </p> */}
        {/* <div>
          <AnimatedButton className='m-2' text='Join' />
          <AnimatedButton className='m-2' text='FAQ' />
        </div> */}
      </div>
      <svg className=' absolute bottom-[0] pointer-events-none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#333232" fillOpacity="1" d="M0,224L30,234.7C60,245,120,267,180,277.3C240,288,300,288,360,272C420,256,480,224,540,218.7C600,213,660,235,720,218.7C780,203,840,149,900,154.7C960,160,1020,224,1080,208C1140,192,1200,96,1260,69.3C1320,43,1380,85,1410,106.7L1440,128L1440,320L1410,320C1380,320,1320,320,1260,320C1200,320,1140,320,1080,320C1020,320,960,320,900,320C840,320,780,320,720,320C660,320,600,320,540,320C480,320,420,320,360,320C300,320,240,320,180,320C120,320,60,320,30,320L0,320Z"></path></svg>
      <svg className=' absolute bottom-[0] pointer-events-none' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#101010" fillOpacity="1" d="M0,192L48,186.7C96,181,192,171,288,186.7C384,203,480,245,576,234.7C672,224,768,160,864,149.3C960,139,1056,181,1152,218.7C1248,256,1344,288,1392,304L1440,320L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
      
    </div>
    <div className='relative pointer-events-none w-full min-h-[100px] h-[100px] bg-cA z-30'></div>
    </>
  );
};

export default Hero;
