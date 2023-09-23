import React, { Fragment } from 'react';
import Tilt from 'react-parallax-tilt';
import brain from '../../assets/images/brain.png';
import './Logo.css';

const Logo = () => {
    return (
        <Fragment>
            <div className='ma4 mt0 py-4 center'>
                <Tilt className="Tilt br-100 shadow-2 bg-red-500" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
                    <div className="Tilt-inner pa3" >
                        <img className="rounded-full" src={brain} alt="logo"/>
                    </div>
                </Tilt>
            </div>
        </Fragment>
    );
}

export default Logo;