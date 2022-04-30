import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import bannerOverlayRight from '../images/io-banner/banner-style-right.svg';
import bannerOverlayLeft from '../images/io-banner/banner-style-left.svg';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../data/constants';
import '../components/fonts.scss';

const BannerBackground = ({ children }) => {
  return (
    <div
      css={css`
        --banner-height: 368px;

        --left-margin: calc(50% - 50vw);

        position: absolute;
        width: 100vw;
        left: var(--left-margin);
        height: var(--banner-height);
        margin: 0 0 0 var(--left-margin);
        padding: 0 40px;

        background: #1d252c;
        box-sizing: border-box;
        @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          --banner-height: unset;
        }
      `}
    >
      <div
        css={css`
          margin: 0 auto 88px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            width: 100%;
            height: unset;
            margin: 0 auto 0px;
          }
        `}
      >
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
              width: 157.03px;
              height: 148px;
              left: 10px;
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
            margin-left: auto;

            @media (max-width: 1440px) {
              display: none;
            }
          `}
        >
          <img
            css={css`
              position: absolute;
              right: 10px;
              top: 36px;
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
  children: PropTypes.node,
};

export default BannerBackground;
