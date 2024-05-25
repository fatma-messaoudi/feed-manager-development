'use client'
import React, { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

const Navbar = () => {
  useEffect(() => {
    const button = document.querySelector('.animated-button');
    if (button) {
      button.classList.add('animate-button');
    }
  }, []);

  return (
    <div className='flex justify-between items-center  lg:px-16 px-4 z-30'>
      <div className="flex-shrink-0 lg:ml-8">
        <Link href={`/`}>
          <Image src='/landing/logo2.svg' height={10} width={200} alt="Logo" className=' ' />
        </Link>
      </div>

      <div className="flex items-center">
        <SignedOut>
          <div className="animated-button lg:mr-8">
            <Link href='/sign-in'>
              <button className='bg-yellow-400 lg:text-md text-sm hover:bg-yellow-500 text-white py-2 px-3 lg:px-4 rounded-full flex items-center justify-center w-12 h-12 lg:w-40'>
                <FontAwesomeIcon icon={faRightToBracket} style={{ color: '#fff', fontSize: '20px' }} className='lg:mr-2' />
                <span className='hidden lg:inline'>Se connecter</span>
              </button>
            </Link>
          </div>
        </SignedOut>

        <SignedIn>
          <div className='lg:mr-8 mr-4'>
            <UserButton afterSignOutUrl='/sign-in' />
          </div>
        </SignedIn>
      </div>
    </div>
  );
};

export default Navbar;
