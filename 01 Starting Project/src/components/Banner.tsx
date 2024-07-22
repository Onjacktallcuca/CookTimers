import React from 'react';
import '../index.css';
interface BannerProps {
  texto: string;
}

const Banner: React.FC<BannerProps> = ({ texto }) => {
  return (
    <div className="banner-container">
        <h3>{texto}</h3>
    </div>
  );
};


export default Banner;