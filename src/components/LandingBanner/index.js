import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from '../../components/Breadcrumbs';
import InstallButton from '../../components/InstallButton';
import { css } from '@emotion/react';
import { quickstart } from '../../types';
import defaultImage from '../../images/defaultQuickstartImage.png';
import BannerBackground from './BannerBackground';

const IMAGE_DISPLAY_BREAKPOINT = '1200px';

const LandingBanner = ({ quickstart, className, location }) => {
  const [imgStyle, setImgStyle] = useState({});

  const breadcrumbs = [
    {
      name: 'Instant Observability',
      url: '/',
    },
    {
      name: quickstart.title,
    },
  ];

  // get image resolution from URL
  const getURLMeta = async (url) => {
    const img = new Image();
    img.src = url;
    const { width, height } = await new Promise((resolve) => {
      img.onload = function () {
        resolve({
          width: this.width,
          height: this.height,
        });
      };
    });
    return { width, height };
  };

  const getImgStyle = async () => {
    const { width, height } = await getURLMeta(quickstart.logoUrl);
    const style = {};
    // if image is rectangle
    if (width > height) {
      style.width = '';
      style.height = '';
    } else {
      style.width = '80px';
      style.height = '80px';
    }
    setImgStyle(style);
  };

  useEffect(() => {
    getImgStyle();
  }, [quickstart.logoUrl]);

  return (
    <BannerBackground>
      <div
        className={className}
        css={css`
          border-bottom: none;
          color: var(--brand-secondary-text-color);
          display: grid;
          grid-column-gap: 1rem;
          grid-row-gap: 1rem;
          grid-template-areas:
            'breadcrumbs logo .'
            'title title image'
            'summ summ image'
            'cta . image';
          grid-template-columns: 1fr 0.5fr 1fr;
          grid-template-rows: 0.25fr 0.5fr auto auto;
          height: 100%;
          justify-content: normal;
          justify-self: center;
          padding-bottom: 1rem;
          row-gap: 1rem;
          z-index: 2;

          h2 {
            color: white;
          }

          @media (max-width: ${IMAGE_DISPLAY_BREAKPOINT}) {
            grid-template-areas:
              'breadcrumbs'
              'title'
              'summ'
              'cta';
            grid-template-columns: 1fr;
            grid-template-rows: 0.25fr 0.25fr auto auto;
          }
        `}
      >
        <Breadcrumbs segments={breadcrumbs} />
        {quickstart.logoUrl && (
          <div
            css={css`
              align-self: start;
              background-color: var(--brand-white);
              border-radius: 0 0 7px 7px;
              grid-area: logo;
              justify-self: center;
              padding: 5px;
              @media (max-width: ${IMAGE_DISPLAY_BREAKPOINT}) {
                display: none;
              }
            `}
          >
            <img
              style={imgStyle}
              src={quickstart.logoUrl}
              alt={quickstart.title}
              css={css`
                margin: auto;
                display: block;
                max-height: 50px;
                width: 100%;
              `}
            />
          </div>
        )}
        <h2
          css={css`
            font-weight: normal;
            grid-area: title;
            margin-bottom: 0;

            @media (max-width: 760px) {
              font-size: 44px;
              line-height: 46px;
              letter-spacing: -0.015em;
            }
          `}
        >
          {quickstart.title}
        </h2>
        {quickstart.summary && (
          <div
            css={css`
              grid-area: summ;
              font-size: 24px;
              line-height: 32px;

              @media (max-width: 760px) {
                max-width: 100%;
                font-size: 18px;
                line-height: 24px;
                letter-spacing: -0.005em;
              }
            `}
          >
            {quickstart.summary}
          </div>
        )}
        <div
          css={css`
            grid-area: image;
            align-self: start;
            margin: 0 auto 1rem;

            @media (max-width: ${IMAGE_DISPLAY_BREAKPOINT}) {
              display: none;
            }
          `}
        >
          <img
            src={quickstart.dashboards[0]?.screenshots[0] ?? defaultImage}
            alt={quickstart.title}
            css={css`
              border: 28px solid #000000;
              border-radius: 26px;
              height: 250px;
            `}
          />
        </div>
        <div
          css={css`
            grid-area: cta;
          `}
        >
          <InstallButton
            css={css``}
            quickstart={quickstart}
            location={location}
            style="PRIMARY"
          />
        </div>
      </div>
    </BannerBackground>
  );
};

LandingBanner.propTypes = {
  quickstarts: quickstart.isRequired,
  location: PropTypes.object.isRequired,
};

export default LandingBanner;
