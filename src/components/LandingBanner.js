import { Button, Icon, Link, useTessen } from '@newrelic/gatsby-theme-newrelic';
import { QUICKSTARTS_REPO, SHIELD_LEVELS } from '../data/constants';
import React, { useEffect, useState } from 'react';

import Breadcrumbs from '../components/Breadcrumbs';
import InstallButton from '../components/InstallButton';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import defaultImage from '../images/defaultQuickstartImage.png';
import BannerBackground from './BannerBackground';

const LandingBanner = ({ quickstart, className }) => {
  const [imgStyle, setImgStyle] = useState({});

  const quickstartUrl = quickstart.packUrl || QUICKSTARTS_REPO;
  const tessen = useTessen();
  const breadcrumbs = [
    {
      name: 'Instant Observability',
      url: '/',
    },
    {
      name: quickstart.title,
    },
  ];

  const trackQuickstart = (action, quickstart) => () =>
    tessen.track({
      eventName: 'instantObservability',
      category: action,
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
      quickstartUrl: quickstart.packUrl,
    });

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
          color: white;
          h2 {
            color: white;
          }
          z-index: 2;

          border-bottom: none;
          display: grid;
          grid-column-gap: 1rem;
          grid-row-gap: 1rem;
          grid-template-columns: 1fr 0.5fr 1fr;
          grid-template-areas:
            'breadcrumbs logo .'
            'title title image'
            'summ summ image'
            'summ summ image'
            'cta . image';
          justify-content: normal;
          justify-self: center;
          row-gap: 1rem;

          @media (max-width: 1300px) {
            grid-template-columns: 1fr;
            grid-template-areas:
              'breadcrumbs'
              'title'
              'summ'
              'cta';
          }
        `}
      >
        <Breadcrumbs segments={breadcrumbs} />
        {quickstart.logoUrl && (
          <div
            css={css`
              background-color: white;
              border-radius: 0 0 7px 7px;
              grid-area: logo;
              align-self: center;
              justify-self: center;
              padding: 5px;
              @media (max-width: 1300px) {
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
            padding-bottom: 0;
            align-self: end;
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
              margin-right: 3rem;

              @media (max-width: 760px) {
                max-width: 100%;
              }
            `}
          >
            {quickstart.summary}
          </div>
        )}
        <div
          css={css`
            grid-area: image;
            align-self: center;
            justify-self: center;
            margin-bottom: 1rem;
            border: 28px solid #000000;
            border-radius: 26px;

            @media (max-width: 1300px) {
              display: none;
            }
          `}
        >
          <img
            src={quickstart.dashboards[0]?.screenshots[0] ?? defaultImage}
            alt={quickstart.title}
            css={css`
              height: 200px;
              width: 100%;
            `}
          />
        </div>
        <div
          css={css`
            grid-area: cta;
          `}
        >
          <InstallButton
            css={css`
              background-color: white;
              color: #1d252c;

              &:hover {
                background-color: white;
                color: #1d252c;
              }
            `}
            quickstart={quickstart}
            location={location}
          />
        </div>
      </div>
    </BannerBackground>
  );
};

LandingBanner.propTypes = {
  quickstarts: quickstart.isRequired,
};

export default LandingBanner;
