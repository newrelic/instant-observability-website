import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import { Button } from '@newrelic/gatsby-theme-newrelic';

import featherIcons from '@newrelic/gatsby-theme-newrelic/src/icons/feather';

const GoToTopButton = ({ scrollDistance }) => {
  const handleScroll = () => {
    const btn = document.getElementById('go-to-page-top-btn');
    if (
      document.body.scrollTop > scrollDistance ||
      document.documentElement.scrollTop > scrollDistance
    ) {
      btn.style.display = 'block';
    } else {
      btn.style.display = 'none';
    }
  };

  useEffect(() => {
    // Anything in here is fired on component mount.
    window.addEventListener('scroll', handleScroll);
    return () => {
      // Anything in here is fired on component unmount.
      window.removeEventListener('scroll', handleScroll);
    };
  });

  function topFunction() {
    document.documentElement.scrollTop = 0;
  }

  return (
    <Button
      className="btn-styles"
      onClick={() => topFunction()}
      css={css`
        display: none;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        padding: 12px 12px;
        gap: 8px;
        position: fixed;
        width: 137px;
        height: 48px;
        left: 9px;
        bottom: 43px;
        background: #1d252c;
        border-radius: 4px;
        border: 1px solid var(--color-white);
        .scroll {
          display: flex;
          column-gap: 8px;
          justify-content: center;
          align-items: center;
        }
        svg {
          stroke: 4px;
          width: 14px;
          height: 14px;
        }
        p {
          font-size: 14px;
          line-height: 1.55;
          margin-right: 2px;
          color: var(--color-white);
        }
      `}
      id="go-to-page-top-btn"
    >
      <div className="btn-animation-styles">
        <div className="scroll scroll-top">
          {featherIcons.topArrow}
          <p className="btn-text">Back to Top</p>
        </div>
        <div className="scroll scroll-bottom">
          {featherIcons.topArrow}
          <p className="btn-text">Back to Top</p>
        </div>
      </div>
    </Button>
  );
};

GoToTopButton.propTypes = {
  scrollDistance: PropTypes.number.isRequired,
};

export default GoToTopButton;
