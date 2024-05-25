
import { Banner, Count, Footer, Navbar, Services } from '@/components'
import Image from 'next/image'
import React from 'react'
import { metadata } from './metadata';

function page() {
  
    
  return (

    <main className='overflow-hidden w-full text-white h-full flex flex-col bg-black'>
      {/* BG + NAVBAR + BANNER */}
      <Navbar />
      <div className=' flex flex-row '>
    
      <Banner/>
      <Image alt='hero banner' width={500}  height={500} src= "/landing/hero.svg" 
      className='lg:mt-[-55px]  lg:mr-[100px] ml-[-30px] lg:ml-1 lg:w-[500px] lg:h-[500px] w-[200px] h-[230px]'/>
      </div>
      
      {/* SERVICES + FOORTER */}
      
        <div id="services" className=' flex-grow '>
          <Services />
        </div>
        
       <div> <Count/> </div>

        <div > <Footer /></div>
         
      

    </main>
  )
}

export default page

