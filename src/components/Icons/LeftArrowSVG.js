import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const LeftArrowSVG = (props) => {
    const { className, style, onClick } = props;
    return (

        <svg width="62" height="62" viewBox="0 0 62 62" fill="none" xmlns="http://www.w3.org/2000/svg"
            className={className} onClick={onClick}>
            <path d="M31 16C34.9782 16 38.7936 17.5804 41.6066 20.3934C44.4196 23.2064 46 27.0218 46 31C46 34.9782 44.4196 38.7936 41.6066 41.6066C38.7936 44.4196 34.9782 46 31 46C27.0218 46 23.2064 44.4196 20.3934 41.6066C17.5804 38.7936 16 34.9782 16 31V31C16 27.0218 17.5804 23.2064 20.3934 20.3934C23.2064 17.5804 27.0218 16 31 16Z" 
            fill="#1D252C" className='arrow-bg' />
            <path d="M31 27.25L31.6609 27.9109L29.0453 30.5312H34.75V31.4688H29.0453L31.6656 34.0844L31 34.75L27.25 31L31 27.25Z" 
            fill="#F9FAFA" className='arrow' />

        </svg>


    );
};

export default LeftArrowSVG;
