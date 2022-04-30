import React, { useEffect, useState } from 'react';
import './Nav.scss';
// import second from '../../assets/netflix.png';
// import netflixLogo from '../../assets/netflix.png';

export const Nav = () => {
  const [show, handleShow] = useState(true);

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <img src={'./netflix.png'} alt='Netflix Logo' className='nav__logo' />
      {/* <img
        src='https://pbs.twimg.com/profile_images/124011999041155/'
        alt='Netflix Logo'
        className='nav__avatar'
      /> */}
    </div>
  );
};
