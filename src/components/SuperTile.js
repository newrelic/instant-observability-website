import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

const breakpoints = {
  '1690': '1690px',
  '1405': '1405px'
}

const SuperTile = ({ children, className, type }) => {
  return (
    <div
      className={className}
      css={css`
        width: 100%;
        display: flex;
        border-radius: 8px;
        padding: 24px;
        flex-direction: column;
        align-items: flex-start;
        ${type === 'primary'
          ? `background: var(--color-brand-700);`
          : `background: var(--tertiary-background-color);`}

        @media only screen and (min-width: ${breakpoints['1405']}) and (max-width: ${breakpoints['1690']}) {
          padding: 1.465rem;
        }
      `}
    >
      {children}
    </div>
  );
};

SuperTile.propTypes = {
  type: PropTypes.string,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default SuperTile;
