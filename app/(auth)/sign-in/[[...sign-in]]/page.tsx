import { SignIn } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (

    <div className='  h-screen bg-black overflow-x-hidden '>
      <Link href={`/`}>
        <Image src='/landing/logo2.svg' height={10} width={200} alt="Logo" className=' flex-nowrap lg:ml-[96px]' />
      </Link>

      <div className='  flex flex-row justify-evenly  mt-[-55px]'>

        <div className=' flex w-[700px] h-[500px] mt-[-55px]'>
          <video autoPlay loop width="420" height="100" className=' ml-[200px]  hidden sm:flex'>
            <source src='/login/log2.mp4' type="video/mp4" />
          </video>
        </div>

        <div className=' flex lg:mr-[150px] lg:mt-0 mt-20 mr-1.5 ' >

          <SignIn
            appearance={{
              elements: {
                headerTitle: "text-3xl",
                footer: "hidden",
                formButtonPrimary: "bg-yellow-400 rounded-2xl w-[200px] ml-[19%] text-sm  text-white ",

              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default page