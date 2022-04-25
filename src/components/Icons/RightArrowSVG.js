import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const RightArrowSVG = (props) => {
    const { className, style, onClick } = props;
    return (
        <svg width="29" height="30" viewBox="0 0 29 30" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} onClick={onClick}>
            <circle r="13.832" transform="matrix(1 0 0 -1 14.3318 15.3223)" fill="white" stroke="#00838F" />
            <rect width="1.26186" height="6.94021" transform="matrix(0.707107 0.707107 0.707107 -0.707107 11.8311 19.3398)" fill="#00838F" />
            <rect width="6.94021" height="1.26186" transform="matrix(0.707107 0.707107 0.707107 -0.707107 11.8955 11.2451)" fill="#00838F" />
        </svg>
    );
};

export default RightArrowSVG;