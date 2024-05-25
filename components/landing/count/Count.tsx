import Image from 'next/image';
import React from 'react';

function Count() {
  const slides = [
    "/landing/fierce.svg",
    "/landing/indigo.svg",
    "/landing/sushiwan.svg",
    "/landing/dar_eljeld.svg",
    "/landing/taiyo.svg",
    "/landing/fierce.svg",
    "/landing/indigo.svg",
    "/landing/sushiwan.svg",
    "/landing/dar_eljeld.svg",
    "/landing/taiyo.svg",
    "/landing/fierce.svg",
    "/landing/indigo.svg",
    "/landing/sushiwan.svg",
    "/landing/dar_eljeld.svg",
    "/landing/taiyo.svg",
    "/landing/fierce.svg",
    "/landing/indigo.svg",
    "/landing/sushiwan.svg",
    "/landing/dar_eljeld.svg",
    "/landing/taiyo.svg",
    "/landing/fierce.svg",
    "/landing/indigo.svg",
    "/landing/sushiwan.svg",
    "/landing/dar_eljeld.svg",
    "/landing/taiyo.svg",
  ];

  return (
    <div className='bg-white'>
      <h1 className='tracking-wide text-black pt-10 font-extrabold text-4xl text-center '>
        Nos Partenaires</h1>
      <div className='slider'>
        <div className='slide-track '>
          {slides.map((slide, index) => (
            <div className='slide' key={index}>
              <Image
                src={slide}
                alt={`slide-${index}`}
                width={150}
                height={150}
                className='imageslide rounded-[30px] mt-5'
              />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default Count;
