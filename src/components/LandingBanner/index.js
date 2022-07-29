import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import Breadcrumbs from '../Breadcrumbs';
import InstallButton from '../InstallButton';
import { graphql } from 'gatsby';
import { css } from '@emotion/react';
import { quickstart } from '../../types';
import QuickstartImg from '../QuickstartImg';
import defaultImage from '../../images/defaultQuickstartImage.png';
import BannerBackground from './BannerBackground';
import SafeImage from '../SafeImage';

const IMAGE_DISPLAY_BREAKPOINT = '1248px';

const LandingBanner = ({ quickstart, className, location }) => {
  const bannerImg = useDetermineBannerImg(quickstart, {
    publicURL: defaultImage,
  });

  const breadcrumbs = [
    {
      name: 'Instant Observability',
      url: '/',
    },
    {
      name: quickstart.title,
    },
  ];

  return (
    <BannerBackground>
      <div
        className={className}
        css={css`
          border-bottom: none;
          color: var(--system-text-primary-dark);
          display: grid;
          width: 100%;
          grid-column-gap: 1rem;
          grid-row-gap: 1rem;
          grid-template-areas:
            'breadcrumbs . .'
            'title title image'
            'summ summ image'
            'cta . image';
          grid-template-columns: 1fr 0.5fr 1fr;
          justify-content: normal;
          justify-self: center;
          padding-bottom: 1rem;
          row-gap: 1rem;
          z-index: 2;

          padding: 0 var(--site-content-padding);
          max-width: 1248px;

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
          @media (max-width: 960px) {
            padding: 0 var(--site-content-padding);
          }
        `}
      >
        <Breadcrumbs segments={breadcrumbs} />
        {(quickstart.logo || quickstart.logoSvg) && (
          <div
            css={css`
              position: absolute;
              display: flex;
              justify-content: center;
              top: 0;
              left: 0;
              right: 0;
              pointer-events: none;
            `}
          >
            <div
              css={css`
                background-color: var(--color-white);
                border-radius: 0 0 7px 7px;
                padding: 5px;
                @media (max-width: ${IMAGE_DISPLAY_BREAKPOINT}) {
                  display: none;
                }
              `}
            >
              <QuickstartImg
                packName={quickstart.name}
                imageNode={quickstart.logo}
                svgNode={quickstart.logoSvg}
                css={css`
                  max-width: 350px;
                  margin: auto;
                  display: block;
                  height: 50px;
                `}
              />
            </div>
          </div>
        )}
        <h2
          css={css`
            font-weight: 500;
            grid-area: title;
            margin-bottom: 0;

            @media (max-width: ${IMAGE_DISPLAY_BREAKPOINT}) {
              font-size: 4vw;
            }

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
              font-size: 1.25vw;

              @media (max-width: ${IMAGE_DISPLAY_BREAKPOINT}) {
                font-size: 2vw;
              }

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
            padding-top: 1rem;

            @media (max-width: ${IMAGE_DISPLAY_BREAKPOINT}) {
              display: none;
            }
          `}
        >
          <SafeImage
            src={bannerImg}
            imageNode={bannerImg}
            rawNode={bannerImg}
            alt={quickstart.title}
            css={css`
              border: 28px solid #000000;
              border-radius: 26px;
              height: 250px;
              max-width: unset;
              background: white;
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
            buttonStyle="PRIMARY"
          />
        </div>
      </div>
    </BannerBackground>
  );
};

/**
 * Determines which screenshot to use for the banner image
 * @param {Object} quickstart - the quickstart object
 * @param {Object} defaultImage - the default image to use, ex: { publicURL: 'http://localhost/screenshot.png' }
 * @returns The image to use in the banner
 */
function useDetermineBannerImg(quickstart, defaultImage) {
  const [bannerImg, setBannerImg] = useState(defaultImage);

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

  const checkImgAspectRatio = async () => {
    let image = bannerImg;

    for (const screenshot of quickstart.dashboards[0]?.screenshots ?? []) {
      const { width, height } =
        screenshot.bannerImg?.gatsbyImageData ??
        (await getURLMeta(screenshot.publicURL));

      const aspectRatio = width / height;
      if (aspectRatio > 1.6 && aspectRatio < 2.2) {
        // set image to this screenshot if its the ideal aspect ratio  of ~1.9
        image = screenshot?.bannerImg ?? screenshot;
        break;
      }
    }
    setBannerImg(image);
  };

  useEffect(() => {
    checkImgAspectRatio();
  });

  return bannerImg;
}

LandingBanner.propTypes = {
  quickstart: quickstart.isRequired,
  className: PropTypes.string,
  location: PropTypes.object.isRequired,
};

// NOTE: we hard-code `height: 45` for logos to match the CSS
// height set for the logo img tags.
export const fragmentQuery = graphql`
  fragment LandingBanner_quickstart on Quickstarts {
    summary
    logoSvg {
      ext
      publicURL
    }
    logo {
      childImageSharp {
        gatsbyImageData(height: 45, placeholder: BLURRED, formats: [AUTO, WEBP])
      }
    }
    dashboards {
      screenshots {
        publicURL
        bannerImg: childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            layout: FIXED
            formats: [AUTO, WEBP]
            height: 250
          )
        }
      }
    }
  }
`;

export default LandingBanner;
