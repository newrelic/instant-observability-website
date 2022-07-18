// Settings for Slick-Carousel in index.js
import React from 'react';
import { css } from '@emotion/react';

import LeftArrowSVG from '@components/Icons/LeftArrowSVG';
import RightArrowSVG from '@components/Icons/RightArrowSVG';

import {
  TRIPLE_COLUMN_BREAKPOINT,
  DOUBLE_COLUMN_BREAKPOINT,
  SINGLE_COLUMN_BREAKPOINT,
  MOBILE_BREAKPOINT,
} from './constants';

export const indexSettings = {
  dots: false,
  infinite: false,
  speed: 300,
  slidesToShow: 4,
  slidesToScroll: 4,
  adaptiveHeight: false,
  adaptiveWidth: true,
  mobileFirst: true, // necessary for breakpoints to work as expected
  prevArrow: (
    <button type="button">
      <LeftArrowSVG
        className="slick-prev"
        css={css`
          width: auto;
          height: auto;
          margin: 0 1.5rem;
        `}
      />
    </button>
  ),
  nextArrow: (
    <button type="button">
      <RightArrowSVG
        className="slick-next"
        css={css`
          width: auto;
          height: auto;
          margin: 0 1.5rem;
        `}
      />
    </button>
  ),

  responsive: [
    {
      breakpoint: parseInt(TRIPLE_COLUMN_BREAKPOINT),
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: parseInt(DOUBLE_COLUMN_BREAKPOINT),
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
        infinite: true,
        dots: false,
      },
    },
    {
      breakpoint: parseInt(SINGLE_COLUMN_BREAKPOINT),
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

// Settings for Slick-Carousel in QuickstartDashboards.js
export const dashboardSettings = {
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
        margin-left: -2rem;
        @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
          margin-left: -1.6rem;
        }
      `}
    />
  ),

  nextArrow: (
    <RightArrowSVG
      css={css`
        width: 62px;
        height: 62px;
        margin-right: -2rem;
        @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
          margin-right: -1.5rem;
        }
      `}
    />
  ),
  // the carousel is acting responsive by default
  responsive: [],
};
