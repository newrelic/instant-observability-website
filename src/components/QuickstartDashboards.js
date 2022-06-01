import React from 'react';
import { css } from '@emotion/react';
import pluralize from 'pluralize';
import Intro from './Intro';
import { quickstart } from '../types';
import Slider from 'react-slick';
import { animated } from 'react-spring';
import RightArrowSVG from './Icons/RightArrowSVG';
import LeftArrowSVG from './Icons/LeftArrowSVG';

const MOBILE_BREAKPOINT = '920px';

const QuickstartDashboards = ({ quickstart }) => {
  // declaring react-slick settings
  const settings = {
    variableWidth: true,
    variableHeight: true,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: (
      <LeftArrowSVG
        css={css`
          width: 62px;
          height: 62px;
          margin-left: -3.5rem;
          @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
            margin-left: -1.5rem;
          }
        `}
      />
    ),

    nextArrow: (
      <RightArrowSVG
        css={css`
          width: 62px;
          height: 62px;
          margin-right: -3.5rem;
          @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
            margin-right: -2rem;
          }
        `}
      />
    ),
    responsive: [
      {
        // 4k resolution
        breakpoint: 3840,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
        breakpoint: 1081,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const renderDescription = (dashboard) => {
    let descriptionToShow = '';
    // check if description field is present
    if (dashboard.description) {
      // check if description and name are same
      if (dashboard.description === dashboard.name) {
        // if both are same, then descriptionToShow will be empty
        descriptionToShow = '';
      } else {
        // if both are not same, then descriptionToShow will be the received description
        descriptionToShow = dashboard.description;
      }
    } else {
      // if description field is not present then the descriptionToShow will be empty
      descriptionToShow = '';
    }
    // render description
    return <p>{descriptionToShow}</p>;
  };

  return (
    <>
      <Intro
        css={css`
          margin-bottom: 16px;
          color: var(--black-text-color);
          @media screen and (max-width: 760px) {
            display: none;
          }
        `}
      >
        {quickstart.title} quickstart contains{' '}
        {pluralize('dashboard', quickstart.dashboards?.length ?? 0, true)}.
        These interactive visualizations let you easily explore your data,
        understand context, and resolve problems faster.
      </Intro>

      {quickstart.dashboards.map((dashboard) => (
        <div key={dashboard.name}>
          <div>
            <p
              css={css`
                font-weight: 700 !important;
                font-family: 'Söhne-Kräftig';
              `}
            >
              {dashboard.name}
            </p>
            {renderDescription(dashboard)}
            <Slider {...settings}>
              {dashboard.screenshots.map((imgUrl, index) => {
                const elementKey = `imgurl_${index}`;
                return (
                  <div
                    css={css`
                      border: solid 1px var(--border-color);
                    `}
                    key={elementKey}
                  >
                    <animated.div
                      css={css`
                        display: flex;
                        height: 100%;
                        align-items: center;
                      `}
                    >
                      <a
                        href={imgUrl}
                        target="_blank"
                        rel="noreferrer"
                        css={css`
                          margin: auto;
                        `}
                      >
                        <img
                          src={imgUrl}
                          css={css`
                            width: 100%;
                            height: 25rem;
                            @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                              height: 100%;
                            }
                            border-radius: 4px;
                            padding: 0.25rem;
                          `}
                        />
                      </a>
                    </animated.div>
                  </div>
                );
              })}
            </Slider>
          </div>
        </div>
      ))}
    </>
  );
};

QuickstartDashboards.propTypes = {
  quickstart: quickstart.isRequired,
};

export default QuickstartDashboards;
