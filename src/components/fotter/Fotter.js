import React from 'react'
import Leaflet from '../leaflet/Leaflet'
import './fotter.css'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faTwitter, faInstagram, faTiktok } from "@fortawesome/free-brands-svg-icons"

const Fotter = () => {
    return (
        <div className='container'>
            <svg
                className='wave'
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1440 320">
                <path
                    fill="#FF4820"
                    fillOpacity=".8"
                    d="M0,160L21.8,165.3C43.6,171,87,181,131,160C174.5,139,218,85,262,64C305.5,43,349,53,393,85.3C436.4,117,480,171,524,170.7C567.3,171,611,117,655,85.3C698.2,53,742,43,785,69.3C829.1,96,873,160,916,192C960,224,1004,224,1047,229.3C1090.9,235,1135,245,1178,240C1221.8,235,1265,213,1309,186.7C1352.7,160,1396,128,1418,112L1440,96L1440,320L1418.2,320C1396.4,320,1353,320,1309,320C1265.5,320,1222,320,1178,320C1134.5,320,1091,320,1047,320C1003.6,320,960,320,916,320C872.7,320,829,320,785,320C741.8,320,698,320,655,320C610.9,320,567,320,524,320C480,320,436,320,393,320C349.1,320,305,320,262,320C218.2,320,175,320,131,320C87.3,320,44,320,22,320L0,320Z">
                </path>

            </svg>

            <div className='cont'>
                <div className='left'>
                    <img src='/fa.png' alt="logo" />
                </div>
                <div className='right'>
                    <div className='map-text'>
                        <div className='text' style={{ backgroundImage: `url(/map.jpg)` }}>
                            <span>
                                <p>
                                    Avrnikh was started with the mission to provide “Economic as well as Efficient” software solutions. We firmly believe in the credibility and scalability of Digital Transformation. Our services are focused on Mobility Solutions, Custom App Development , Web App Development, Cloud Solutions, Artificial Intelligence & Machine Learning, Predictive Analytics & Big Data Solutions, and several other trending as well as emerging technologies. At its core, Avrnikh is all about developing solutions which help clients accelerate their business processes, achieve optimum productivity, and mitigate risks.
                                </p>
                            </span>

                        </div>
                        <div className='map'>
                            <Leaflet />
                        </div>
                    </div>
                    <div className='buttom'>
                        <a href="https://www.w3schools.com" rel="noreferrer" target="_blank" > <FontAwesomeIcon icon={faFacebook} /></a>
                        <a href="https://www.w3schools.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faTwitter} /></a>
                        <a href="https://www.w3schools.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faInstagram} /></a>
                        <a href="https://www.w3schools.com" rel="noreferrer" target="_blank"><FontAwesomeIcon icon={faTiktok} /></a>
                    </div>
                    <div className='nomination'> © avrnikh iziki {new Date().getFullYear()}</div>
                </div>
            </div>
        </div>
    );
}

export default Fotter