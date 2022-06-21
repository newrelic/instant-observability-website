import React from 'react';
import PropTypes from 'prop-types';

const FacebookSVG = ({ width, height }) => {
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
        d="M21.0689 0C21.8463 0.000683366 22.5916 0.309862 23.1412 0.859632C23.6907 1.4094 23.9996 2.15481 24 2.93215V21.0679C23.9993 21.845 23.6903 22.5901 23.1407 23.1396C22.5912 23.6891 21.8461 23.9981 21.0689 23.9988H2.93229C2.15492 23.9985 1.40947 23.6896 0.859674 23.14C0.309877 22.5905 0.000683399 21.8452 0 21.0679L0 2.93215C0.00037282 2.15461 0.309429 1.40902 0.85926 0.859218C1.40909 0.309414 2.15471 0.000372802 2.93229 0L21.0689 0ZM16.2586 24V15.6291H19.056L19.5883 12.1589H16.2586V9.90787C16.2586 8.95847 16.7238 8.03205 18.2151 8.03205H19.729V5.07762C19.729 5.07762 18.3551 4.84314 17.0415 4.84314C14.298 4.84314 12.5067 6.50512 12.5067 9.51395V12.1589H9.45837V15.6291H12.5067V24"
        fill="#1D252C"
      />
    </svg>
  );
};

FacebookSVG.propTypes = {
  width: PropTypes.string,
  height: PropTypes.string,
};

FacebookSVG.defaultProps = {
  width: '24',
  height: '24',
};

export default FacebookSVG;
