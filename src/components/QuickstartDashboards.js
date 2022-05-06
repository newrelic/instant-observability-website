import React from 'react';
import { css } from '@emotion/react';
import pluralize from 'pluralize';
import Intro from './Intro';
import { quickstart } from '../types';
import Slider from 'react-slick';
import { animated } from 'react-spring';
import {
  Icon
} from '@newrelic/gatsby-theme-newrelic';

const PrevArrow = (
  <Icon
    name="carousel-left"
    size="120%"
    viewBox="0 0 30 30"
    css={css`
      fill: white;
      stroke: #00838f;
      z-index: 100;
      stroke-width: 1px;
      width: 29px;
      height: 29px;
    `}
  />
);
const NextArrow = (
  <Icon
    name="carousel-right"
    size="120%"
    viewBox="0 0 30 30"
    css={css`
      fill: white;
      stroke: #00838f;
      z-index: 100;
      stroke-width: 1px;
      width: 29px;
      height: 29px;
    `}
  />
);

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  prevArrow: PrevArrow,
  nextArrow: NextArrow,
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
        line-height:28px !important;
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
          line-height: 28px !important;
          margin-bottom: 0;
          `}>
            {dashboard.name}
          </p>
          {dashboard.description &&
            <p
              css={css`
          line-height: 28px !important;
          `}>
              {dashboard.description}</p>
          }
          <Slider {...settings}>
            {dashboard.screenshots.map((imgUrl) => {
              return (
                <div>
                  <animated.div
                    css={css`
                     display: grid;
                     height: 100%;
                     align-items: center;
                     padding-left: 5px;
                     padding-right: 5px;

                     @media (max-width: 760px) {
                      padding-left: 5px;
                      padding-right: 5px;
                     }
                   `}
                  >
                    <a
                      css={css`
                    margin: auto;
                    `}
                      href={imgUrl} target="_blank" rel="noreferrer">
                      <img
                        src={imgUrl}
                        css={css`
                            width: 100%;
                            border-radius: 4px;
                            border: solid 1px var(--divider-color);
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
