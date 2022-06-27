import React, { useState } from 'react';
import PropTypes from 'prop-types';
import IOLogo from 'components/IOLogo';

const Logo = ({ className, width }) => {
  const instantObservabilityLogo = (
    <IOLogo className={className} width={width} />
  );

  const [logo, _setLogo] = useState(instantObservabilityLogo);

  return logo;
};

Logo.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
};

export default Logo;
