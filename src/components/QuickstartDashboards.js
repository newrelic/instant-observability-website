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
                <div>
                  <animated.div
                    css={css`
                      display: flex;
                      height: 100%;
                      align-items: center;
                    `}
                  >
                    <a href={imgUrl} target="_blank" rel="noreferrer">
                      <img
                        src={imgUrl}
                        css={css`
                            width: 100%;
                            max-height: 400px;
                            border-radius: 4px;
                            border: solid 1px var(--divider-color);
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
