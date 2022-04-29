import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const LeftArrowSVG = (props) => {
    const { className, style, onClick } = props;

    return (

        <svg width="29" height="29" viewBox="0 0 29 29" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
            <circle r="13.832" transform="matrix(-1 8.74228e-08 8.74228e-08 1 14.332 14.668)" fill="white" stroke="#00838F" />
            <rect width="1.26186" height="6.94021" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 16.8276 10.6504)" fill="#00838F" />
            <rect width="6.94021" height="1.26186" transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 16.7632 18.7451)" fill="#00838F" />
        </svg>

    );
};

export default LeftArrowSVG;
