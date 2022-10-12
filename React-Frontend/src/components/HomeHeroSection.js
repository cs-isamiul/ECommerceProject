import React from 'react';
import { Button } from './HomeButton';
import './HomeHeroSection.css';
import YoutubeEmbed from "./YoutubeEmbed";

function HeroSection() {
  return (
    <div className='hero-container'>
      {/* <video src='/videos/video-1.mp4' autoPlay loop muted /> */}
      <YoutubeEmbed embedId="zIoirehCkv0?rel=0&autoplay=1&mute=1&controls=0&loop=1&playlist=zIoirehCkv0" />
      <h1>Get Connected</h1>
      <p>Future is in your hand!</p>
      <div className='hero-btns'>
        <Button
          className='btns'
          buttonStyle='btn--outline'
          buttonSize='btn--large'
        >
          <h1>GO SHOP</h1>
        </Button>
      </div>
    </div>
  );
}

export default HeroSection;
