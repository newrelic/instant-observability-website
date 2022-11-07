import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import bannerOverlayRight from '../../images/io-banner/banner-style-right.svg';
import bannerOverlayLeft from '../../images/io-banner/banner-style-left.svg';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '@data/constants';

const BannerBackground = ({ children }) => {
  return (
    <div
      css={css`
        --left-margin: calc(50% - 50vw);
        width: 100vw;
        left: var(--left-margin);

        background: var(--website-banner-background-color);
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          height: 100%;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            width: 100%;
            margin: 0 auto 0px;
          }
          max-width: 98rem;
          margin-left: auto;
          margin-right: auto;
          margin-bottom: 1rem;
        `}
      >
        <div
          css={css`
            width: 6rem;
            margin-top: -8rem;
            margin-right: 92%;
            position: absolute;

            @media (max-width: 1310px) {
              display: none;
            }
          `}
        >
          <img src={bannerOverlayLeft} alt="banner-left" loading="lazy" />
        </div>
        {children}
        <div
          css={css`
            width: 6rem;
            margin-top: -5rem;
            margin-left: 65%;
            position: absolute;

            @media (max-width: 1310px) {
              display: none;
            }
          `}
        >
          <img src={bannerOverlayRight} alt="banner-right" loading="lazy" />
        </div>
      </div>
    </div>
  );
};

BannerBackground.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BannerBackground;
