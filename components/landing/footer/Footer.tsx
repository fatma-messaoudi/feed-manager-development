import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import React from 'react';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer>
      <div className='bg-[#000] pt-4  flex justify-between items-center flex-col lg:flex-row lg:items-start lg:h-[300px]'>
        {/* Logo */}
        <div className='hidden lg:block'>
          <Image src='/landing/logo2.svg' height={150} width={200} alt="Logo" className='ml-5' />
        </div>

        {/* Contact Info */}
        <div className='flex flex-col items-center lg:text-left text-sm text-black mt-5 lg:mt-0'>
          <h1 className='text-lg text-[#fff] font-medium mb-3 lg:mb-5'>Vous pouvez nous contacter à</h1>

          {/* Phone */}
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faPhone} className='w-4 mr-2' style={{ color: '#000' }} />
            <p className='text-[#fff] font-medium'>(+216) 27 707 777</p>
          </div>
          <div className='flex items-center'>
            <FontAwesomeIcon icon={faPhone} className='w-4 mr-2' style={{ color: '#000' }} />
            <p className='text-[#fff] font-medium'>(+216) 27 337 777</p>
          </div>
          {/* Email */}
          <div className='flex items-center mr-10'>
            <FontAwesomeIcon icon={faEnvelope} className='w-4 mr-2' style={{ color: '#000' }} />
            <p className='text-[#fff] font-medium'>Webi@live.fr</p>
          </div>

          {/* Social Media */}
          <h1 className='text-lg text-[#fff] font-medium mt-5 mb-3 lg:mt-7'>Reseaux sociaux</h1>
          <div className='flex-row flex ml-6 mb-'>
            <a href='https://www.instagram.com/webi_studio/' target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} className='w-6 mr-6' style={{ color: '#fff', fontSize: '24px' }} />
            </a>
            <a href='https://www.facebook.com/WEBI.TUNISIE' target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} className='w-6 mr-6' style={{ color: '#fff', fontSize: '24px' }} />
            </a>
            <a href='https://www.linkedin.com/company/webi/' target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faLinkedin} className='mr-6' style={{ color: '#fff', fontSize: '24px' }} />
            </a>
            <a href='https://twitter.com/webitunisie' target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faTwitter} className='w-6 mr-6' style={{ color: '#fff', fontSize: '24px' }} />
            </a>
          </div>
        </div>

        {/* Map */}
        <div className="w-full lg:w-auto">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12767.691141808082!2d10.314865!3d36.868267!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12fd4b33a1871827%3A0xe8cc727da3b796bc!2sWEBI%20STUDIO!5e0!3m2!1sfr!2stn!4v1707921672594!5m2!1sfr!2stn"
            loading="lazy"
            className='h-[150px] lg:h-[300px] w-full lg:w-[550px] lg:pr-2 lg:ml-10'
          ></iframe>
        </div>
      </div>

      {/* Footer Text */}
      <div className='bg-[#000] font-medium text-white items-center flex justify-center p-3 lg:p-5 text-xs lg:text-sm'>
        <p>All Rights Reserved 2024 <span className="text-yellow-400 font-bold">©</span> Made By <a href='https://webi.tn/'><span className="text-yellow-400">Webi</span></a></p>
      </div>
    </footer>
  );
}

export default Footer;
