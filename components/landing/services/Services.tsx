'use client';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.querySelector('.animated-element');
      if (element) {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        if (elementTop < windowHeight * 0.75) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className='w-full bg-white mt-10'>
      <div className='bg-[#00000000]'>
        <div className='flex justify-evenly items-center pt-10'></div>
        <h1 className='text-black font-extrabold text-4xl text-center'>Nos Services</h1>
      </div>
      <div className='flex flex-col lg:flex-row justify-evenly mt-5 items-center'>
        <div className={`animated-element ${isVisible ? 'pop' : ''}`}>
          <div className='text-[#000] mt-4 lg:mt-[-8%] items-center flex-col flex w-[200px] lg:w-[300px] h-[200px] lg:h-[250px] rounded-2xl'>
            <Image
              src="/landing/t1.svg"
              alt=""
              width={150}
              height={150}
              className='drop-shadow-xl mt-5 w-[100px] lg:w-[150px] h-[100px] lg:h-[150px]'
            />
            <h2 className='text-md lg:text-lg pt-5 font-semibold text-center'>Prévisualisation et Planification</h2>
          </div>
        </div>
        <div className={`animated-element ${isVisible ? 'pop' : ''}`}>
          <div className='text-[#000] items-center flex-col flex mt-4 lg:mt-[-8%] w-[200px] lg:w-[300px] h-[200px] lg:h-[250px] rounded-2xl'>
            <Image
              src="/landing/t2.svg"
              alt=""
              width={150}
              height={150}
              className='drop-shadow-xl mt-5 w-[100px] lg:w-[150px] h-[100px] lg:h-[150px]'
            />
            <h2 className='text-md lg:text-lg pt-5 font-semibold text-center'>Commentaires et Retours</h2>
          </div>
        </div>
        <div className={`animated-element ${isVisible ? 'pop' : ''}`}>
          <div className='text-[#000] items-center flex-col flex mt-4 lg:mt-[-8%] w-[200px] lg:w-[300px] h-[200px] lg:h-[250px] rounded-2xl'>
            <Image
              src="/landing/t3.svg"
              alt=""
              width={150}
              height={150}
              className='drop-shadow-xl mt-5 w-[100px] lg:w-[150px] h-[100px] lg:h-[150px]'
            />
            <h2 className='text-md lg:text-lg pt-5 font-semibold text-center'>Communication Facilitée</h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
