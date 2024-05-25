'use client'
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useEffect } from 'react';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';


const Navbar2 = () => {
  useEffect(() => {
    const button = document.querySelector('.animated-button');
    if (button) {
      button.classList.add('animate-button');
    }
  }, []);
  return (
    <div className=' flex justify-between  items-center mt-[-3%]  z-30'>
      <div className="ml-[10%]">
        <Link href={`/`}>
          <Image src='/landing/logo2.svg' height={150} width={200} alt="Logo feed manager" />
        </Link>

      </div>

      <SignedOut>
        <div className=" animated-button mr-[10%]">
          <Link href='/sign-in'>
            <button className=' bg-yellow-400 text-md hover:bg-yellow-500 text-white p-2 rounded-3xl shadow-xl'><FontAwesomeIcon icon={faRightToBracket} style={{ color: '#Ffff', fontSize: '20px' }} className='  w-8' />se connecter </button>
          </Link>
        </div>
      </SignedOut>

      <SignedIn>
        <div className='mr-[10%]  flex flex-row'>

          <UserButton
            afterSignOutUrl='/sign-in'
            appearance={{
              elements: {
                userButtonAvatarBox: " h-[50px] w-[50px]  text-black",

                userButtonPopoverActionButton__manageAccount: "text-black",
                userButtonBox: "text-black",


              }
            }} />

        </div>
      </SignedIn>
    </div>
  );
};

export default Navbar2;
