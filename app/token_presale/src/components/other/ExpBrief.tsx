import React from 'react';
import AnimatedSectionBrief from '../animated/AnimatedSectionBrief';
import AnimatedOnViewTitleMd from '../animated/AnimatedOnViewTitleMd';


export default function ExpBriefOne() {

    return (
        <div className='w-full bg-cA text-cC text-center m-0 pb-20 overflow-hidden opacity-80'>
            <div>
                <AnimatedOnViewTitleMd text='View Our Website In 3D Instead:' className='text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-normal pb-1' />
                <AnimatedOnViewTitleMd text='(Might explode your device)' className='text-xl sm:text-2xl md:text-3xl lg:text-3xl font-light pt-0 pb-3' />
                <AnimatedSectionBrief sectionImg={'/images/sectionImages/3DExperience.webp'} route='/experience' text='The MoonGhost 3D Experience' bText='More' textClassName='text-3xl sm:text-3xl md:text-4xl lg:text-5xl' 
                sectionDivClassName='h-[40vh] md:h-[40vh] lg:h-[40vh]'/>

            </div>
        </div>
      );
    };

