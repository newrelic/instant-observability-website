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

  // NOTE: we're not using `<GatsbyImage>` for the dashboard screenshots because
  // it did not play well with the slider. In the future, we should evaluate re-introducing
  // this so that we can gain some additional benefits from sharp.
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
              {dashboard.screenshots.map((node, index) => (
                <div
                  css={css`
                    border: solid 1px var(--border-color);
                  `}
                  key={`imgurl_${index}`}
                >
                  <animated.div
                    css={css`
                      display: flex;
                      height: 100%;
                      align-items: center;
                    `}
                  >
                    <a
                      href={node.publicURL}
                      target="_blank"
                      rel="noreferrer"
                      css={css`
                        margin: auto;
                      `}
                    >
                      <img
                        src={node.publicURL}
                        alt={`${dashboard.name} screenshot ${index}`}
                        css={css`
                          width: 100%;
                          height: 17.5rem;
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
              ))}
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
