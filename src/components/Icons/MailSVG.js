import React from 'react';
import PropTypes from 'prop-types';

const MailSVG = ({
    width,
    height
}) => {
    return(
        <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.52 9.83984L12 13.3599L6.47998 9.83984V15.8398H17.48L17.52 9.83984ZM17.52 8.26001V8.16992H6.52002V8.26001L12.04 11.78L17.52 8.26001ZM20 0H4C2.93913 0 1.92165 0.421485 1.17151 1.17163C0.421363 1.92178 0 2.93913 0 4V20C0 21.0609 0.421363 22.0782 1.17151 22.8284C1.92165 23.5785 2.93913 24 4 24H20C21.0609 24 22.0782 23.5785 22.8284 22.8284C23.5785 22.0782 24 21.0609 24 20V4C24 2.93913 23.5785 1.92178 22.8284 1.17163C22.0782 0.421485 21.0609 0 20 0ZM18.86 17.1699H5.10999V6.83984H18.8199L18.86 17.1699Z" fill="#1D252C"/>
        </svg>
    )
}

MailSVG.protoTypes = {
    width: PropTypes.string,
    height: PropTypes.string
}

MailSVG.defaultProps = {
    width: '24',
    height: '24'
}

export default MailSVG;
