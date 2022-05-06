import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import bannerOverlayRight from '../../images/io-banner/banner-style-right.svg';
import bannerOverlayLeft from '../../images/io-banner/banner-style-left.svg';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../../data/constants';

const BannerBackground = ({ children }) => {
  return (
    <div
      css={css`
        --banner-height: 430px;

        --left-margin: calc(50% - 50vw);

        width: 100vw;
        left: var(--left-margin);
        height: var(--banner-height);
        margin: 0 0 0 var(--left-margin);

        background: var(--brand-secondary-background-color);
        box-sizing: border-box;
        @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          --banner-height: unset;
        }
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
        `}
      >
        <div
          css={css`
            margin-left: auto;

            @media (max-width: 1440px) {
              display: none;
            }
          `}
        >
          <img
            css={css`
              position: absolute;
              width: 157.03px;
              height: 148px;
              left: 5px;
              top: 50px;
              z-index: auto;
            `}
            src={bannerOverlayLeft}
            alt="banner-left"
            loading="lazy"
          />
        </div>
        {children}
        <div
          css={css`
            margin-right: auto;

            @media (max-width: 1440px) {
              display: none;
            }
          `}
        >
          <img
            css={css`
              position: absolute;
              right: 5px;
              top: 0px;
              z-index: auto;
            `}
            src={bannerOverlayRight}
            alt="banner-right"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

BannerBackground.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BannerBackground;
