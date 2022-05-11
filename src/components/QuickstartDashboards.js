import React from 'react';
import { css } from '@emotion/react';
import pluralize from 'pluralize';
import Intro from './Intro';
import { quickstart } from '../types';
import Slider from 'react-slick';
import { animated } from 'react-spring';
import RightArrowSVG from './Icons/RightArrowSVG';
import LeftArrowSVG from './Icons/LeftArrowSVG';

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: <LeftArrowSVG css={css`
                            width: 62px; 
                            height: 62px; 
                            margin-left: -20px;
                            `} />,

  nextArrow: <RightArrowSVG css={css`
                                width: 62px; 
                                height: 62px; 
                                margin-right: -12px;
                                `} />,
  responsive: [
    {
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

const QuickstartDashboards = ({ quickstart }) => (
  <>
    <Intro
      css={css`
        margin-bottom: 16px;
        color: var(--black-text-color);
        @media screen and (max-width: 760px){
          display: none;
        }
      `}
    >
      {quickstart.title} quickstart contains{' '}
      {pluralize('dashboard', quickstart.dashboards?.length ?? 0, true)}. These
      interactive visualizations let you easily explore your data, understand
      context, and resolve problems faster.
    </Intro>

    {quickstart.dashboards.map((dashboard) => (
      <div key={dashboard.name}>
        <div>
          <p
            css={css`
          font-weight: 700 !important;
          font-family: 'Söhne-Kräftig';

          `}>
            {dashboard.name}
          </p>
          {dashboard.description && <p>{dashboard.description}</p>}
          <Slider {...settings}>
            {dashboard.screenshots.map((imgUrl) => {
              return (
                <div
                  css={css`
                    border: solid 1px var(--border-color);
                  `}
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
                          height: 250px;
                          border-radius: 4px;
                          padding: 0.25rem;
                        `}
                      />
                    </a>
                  </animated.div>
                </div>
              );
            })}
          </Slider></div>
      </div>
    ))}
  </>
);

QuickstartDashboards.propTypes = {
  quickstart: quickstart.isRequired,
};

export default QuickstartDashboards;