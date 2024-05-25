'use client'
import React from 'react';
import '/app/globals.css';
import { animateScroll as scroll } from 'react-scroll';

const Banner = () => {

  function scrollToServices() {
    scroll.scrollTo(650, { smooth: true, duration: 1000 });
  }

  return (
    <div className='h-full lg:w-[100%] lg:ml-[10%] ml-[2%] lg:mt-[50px] mb-10 z-50'>
      <h1 className="typing-animation lg:mr-1 mr-[10px] lg:text-4xl text-[15px] font-bold">
        Visualisez demain, dès aujourd'hui :
      </h1>

      <div className="lg:ml-5 ml-[10px] pt-5 lg:text-xl text-[13px]">
        <p className="lg:font-medium drop-shadow-xl text-container lg:w-[100%] w-[200px]">
          Avec notre <span className="text-yellow-400">Feed Manager</span>, obtenez un avant-goût exclusif de votre futur sur Instagram. Explorez, interagissez et préparez-vous à dominer votre présence en ligne dès maintenant !
        </p>
      </div>

      <button
        className='hidden sm:block bg-[#facc00] p-3 hover:bg-yellow-500 shadow-xl rounded-xl lg:w-[300px] w-[200px] font-bold text-white ml-[5%] mt-[5%] opacity-0 fadeIn ease-in-out duration-300 z-50 delayed-visibility'
        onClick={() => scrollToServices()}
      >
        Voir plus
      </button>
    </div>
  );
};

export default Banner;
