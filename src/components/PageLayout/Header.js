import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const Header = ({ children, className }) => (
  <header
    className={className}
    css={css`
      grid-area: page-header;
      display: flex;
      flex-wrap: wrap;
      align-items: baseline;
      justify-content: space-between;
      padding-bottom: 1rem;

      @media screen and (max-width: 1080px) {
        flex-direction: column;
        align-items: flex-start;
      }
    `}
  >
    {children}
  </header>
);

Header.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

export default Header;
