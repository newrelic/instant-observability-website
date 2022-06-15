import React from 'react';
import PropTypes from 'prop-types';

const LinkedinSVG = ({ width, height }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M21.0678 0C22.6861 0 24 1.3139 24 2.93222V21.0678C24 22.6861 22.6861 24 21.0678 24H2.93222C1.3139 24 0 22.6861 0 21.0678V2.93222C0 1.3139 1.31386 0 2.93222 0H21.0678ZM7.5216 19.8412V9.2607H4.00411V19.8412H7.5216ZM20.2031 19.8412V13.7737C20.2031 10.5237 18.4679 9.01188 16.154 9.01188C14.2882 9.01188 13.4524 10.038 12.9845 10.7587V9.2607H9.46788C9.5145 10.2535 9.46788 19.8412 9.46788 19.8412H12.9844V13.9323C12.9844 13.616 13.0072 13.2998 13.1004 13.0738C13.3542 12.4421 13.9332 11.7878 14.9048 11.7878C16.1768 11.7878 16.6864 12.7585 16.6864 14.1802V19.8412H20.2031ZM5.78662 4.15885C4.58315 4.15885 3.79687 4.95005 3.79687 5.98706C3.79687 7.0023 4.55925 7.8153 5.74008 7.8153H5.76277C6.98928 7.8153 7.75272 7.0023 7.75272 5.98706C7.72998 4.9515 6.99138 4.1611 5.78662 4.15885Z"
        fill="#1D252C"
      />
    </svg>
  );
};

LinkedinSVG.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

LinkedinSVG.defaultProps = {
  width: '24',
  height: '24',
};

export default LinkedinSVG;
