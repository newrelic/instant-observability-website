import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const AlertIcon = () => {
    return (

        <svg width="24" height="23" viewBox="0 0 24 23" fill="none" xmlns="http://www.w3.org/2000/svg" className="Alert">
            <path d="M3.72703 16.2729V11.0228C3.72703 7.53774 5.93109 4.57385 9.01621 3.42552C9.22717 2.05287 10.4089 1 11.8407 1C13.2726 1 14.4581 2.05287 14.6691 3.42552C17.7542 4.57385 19.9545 7.53774 19.9545 11.0228V16.2729C19.9545 17.8546 21.2374 19.1365 22.8181 19.1365H0.863365C2.44697 19.1365 3.72703 17.8546 3.72703 16.2729Z" stroke="#1D252C" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M8.97702 19.1365C8.97702 20.7182 10.2599 22.0001 11.8407 22.0001C13.4243 22.0001 14.7043 20.7182 14.7043 19.1365" stroke="#1D252C" stroke-width="0.75" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    );
};

AlertIcon.propTypes = {
    className: PropTypes.string,
    width: PropTypes.string,
};

export default AlertIcon;
