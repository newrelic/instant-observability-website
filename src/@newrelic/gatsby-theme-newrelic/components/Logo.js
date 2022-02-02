import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import IOLogo from '../../../components/IOLogo';

const Logo = ({ className, width }) => {
  const instantObservabilityLogo = (
    <IOLogo className={className} width={width} />
  );

  const [logo, setLogo] = useState(instantObservabilityLogo);

  return logo;
};

Logo.propTypes = {
  className: PropTypes.string,
  width: PropTypes.string,
};

export default Logo;
