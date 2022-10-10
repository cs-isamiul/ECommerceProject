import React from 'react';
import { Button } from './HomeButton';
import './HomeHeroSection.css';

function HeroSection() {
  return (
    <div className='hero-container'>
      <video src='/videos/video-1.mp4' autoPlay loop muted />
      <h1>Get Connected</h1>
      <p>Future is in your hand!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          GO SHOP
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
