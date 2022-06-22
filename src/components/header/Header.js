import React from 'react';
import ai from '../../assets/ai.png';
import './header.css';


const Header = () => {

  return (
    <>
      <div className="header-cont" >
        <div className="header-left">
          <div className='header-title'>
            <h1>Imade iziki</h1>
            <h1>Imade iziki</h1>
          </div>
          <p>
          Avrnikh was started with the mission to provide Economic as well as Efficient software solutions. We firmly believe in the credibility and scalability of Digital Transformation.
          Our services are focused on Mobility Solutions, Custom App Development , Web App Development, Cloud Solutions, Artificial Intelligence & Machine Learning, Predictive Analytics & Big Data Solutions, and several other trending as well as emerging technologies. At its core, Avrnikh is all about developing solutions which help clients accelerate their business processes, achieve optimum productivity, and mitigate risks.
          </p>
        </div>
        <div className="header-right">
          <img src={ai} alt="ai" />
        </div>
      </div>
      <div className='separtion'>
        <span></span>
      </div>
    </>
  )
};

export default Header;