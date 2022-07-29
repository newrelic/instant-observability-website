import React from 'react';
import { graphql } from 'gatsby';
import Slider from 'react-slick';
import { animated } from 'react-spring';
import pluralize from 'pluralize';

import { css } from '@emotion/react';
import { quickstart } from '../types';
import Intro from './Intro';
import SafeImage from './SafeImage';

import { dashboardSettings } from '../data/slick-settings';

const QuickstartDashboards = ({ quickstart }) => {
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
                font-weight: 600;
              `}
            >
              {dashboard.name}
            </p>
            {renderDescription(dashboard)}
            <Slider {...dashboardSettings}>
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
                      <SafeImage
                        css={css`
                          padding: 0.25rem;
                          height: 272px;
                        `}
                        imageNode={node}
                        rawNode={node}
                        alt={`${dashboard.name} screenshot ${index}`}
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

export const fragmentQuery = graphql`
  fragment QuickstartDashboards_quickstart on Quickstarts {
    dashboards {
      description
      name
      screenshots {
        publicURL
        childImageSharp {
          gatsbyImageData(
            placeholder: BLURRED
            layout: CONSTRAINED
            formats: [AUTO, WEBP]
            height: 272
          )
        }
      }
    }
  }
`;

export default QuickstartDashboards;
