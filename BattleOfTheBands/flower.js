import React from 'react';
import { useSpring, animated } from 'react-spring';

const PixelFlower = () => {
  // Define the spring animation
  const props = useSpring({
    from: { transform: 'scale(0)' },
    to: { transform: 'scale(1)' },
    config: { tension: 170, friction: 12 },
    reset: true,
  });

  // Inline styles for the pixel flower parts
  const flowerStyles = {
    petalside: {
      display: 'inline-block',
      backgroundColor: 'rgba(255, 0, 0, 0.7)', // semi-transparent red
      width: '30px', // Larger size of the petals
      height: '20px',
      transform: 'rotate(90deg)',
      position: 'absolute',
    },
    petalup: {
        display: 'inline-block',
        backgroundColor: 'rgba(255, 0, 0, 0.7)', // semi-transparent red
        width: '30px', // Larger size of the petals
        height: '20px',
        position: 'absolute',
      },
    center: {
      display: 'inline-block',
      backgroundColor: 'yellow',
      width: '10px', // Smaller center square
      height: '10px',
      position: 'absolute',
      top: '40px', // Position center in the middle of the petals
      left: '45px',
      zIndex: 10,
    },
    stem: {
      display: 'inline-block',
      backgroundColor: 'green',
      width: '10px',
      height: '70px', // Length of the stem
      position: 'absolute',
      top: '60px',
      left: '45px',
    },
    leaf: {
      display: 'inline-block',
      backgroundColor: 'green',
      width: '10px',
      height: '20px', // Larger leaves
      position: 'absolute',
      transform: 'rotate(90deg)', // Diagonal leaves
      top: '80px', // Position at the center of the stem
    }
  };

  // Render the animated component
  return (
    <animated.div style={props}>
      <div style={{ position: 'relative', width: '100px', height: '160px' }}>
        {/* Petals */}
        <div style={{ ...flowerStyles.petalup, top: '20px', left: '35px' }}></div> {/* Top petal */}
        <div style={{ ...flowerStyles.petalup, top: '50px', left: '35px' }}></div> {/* Right petal */}
        <div style={{ ...flowerStyles.petalside, top: '35px', left: '50px' }}></div> {/* Bottom petal */}
        <div style={{ ...flowerStyles.petalside, top: '35px', left: '20px' }}></div> {/* Left petal */}
        {/* Center */}
        <div style={flowerStyles.center}></div>
        {/* Stem */}
        <div style={flowerStyles.stem}></div>
        {/* Leaves */}
        <div style={{ ...flowerStyles.leaf, left: '35px' }}></div> {/* Left leaf */}
        <div style={{ ...flowerStyles.leaf, left: '55px' }}></div> {/* Right leaf */}
      </div>
    </animated.div>
  );
};

export default PixelFlower;
