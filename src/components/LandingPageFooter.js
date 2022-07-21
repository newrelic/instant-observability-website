import React from 'react';
import PropTypes from 'prop-types';
import { Link, Button } from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import { QUICKSTARTS_REPO } from '@data/constants';
import SupportSection from './SupportSection';
import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import RelatedResources from './RelatedResources';
import TickIconSVG from './Icons/TickIconSVG';
import GitHubIconSVG from './Icons/GitHubIconSVG';

const LandingPageFooter = ({
  quickstart,
  trackQuickstart,
  tessenSupportTrack,
}) => {
  const quickstartUrl = quickstart.packUrl || QUICKSTARTS_REPO;
  return (
    <>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          grid-auto-rows: minmax(100px, auto);
          font-size: 18px;

          @media (max-width: 760px) {
            grid-template-columns: repeat(1, 1fr);
            h6 {
              margin-bottom: 15px;
              margin-top: 45px;
            }
          }

          @media (min-width: 760px) {
            margin-top: 11px;
            h6 {
              line-height: 32px;
              font-weight: 400;
            }
          }

          @media not all and (min-resolution: 0.001dpcm) and max-width: 760px {
            @media {
              grid-template-columns: repeat(1, 1fr);
              margin-left: 40px;
              margin-right: 23px;
            }
          }
        `}
      >
        <div>
          <h6
            css={css`
              height: 32px;
              margin-bottom: 66px;
            `}
          >
            Authors
          </h6>
          <p
            css={css`
              line-height: 28px;
            `}
          >
            {quickstart.authors.join(', ')}
          </p>
        </div>

        <div>
          <h6
            css={css`
              height: 32px;
              margin-bottom: 58px;
            `}
          >
            Support
          </h6>
          <div>
            <SupportSection
              supportLevel={quickstart.level}
              onClick={tessenSupportTrack(quickstart)}
            />
          </div>
        </div>

        <div>
          <h6
            css={css`
              height: 64px;
              margin-bottom: 33px;
            `}
          >
            Collaborate on this quickstart
          </h6>
          <div>
            <Button
              css={css`
                border-radius: 4px;
                padding: 0px 20px 0px 22px;
                column-gap: 14.45px;
                font-weight: 400;
                height: 3rem;
                @media (max-width: 760px) {
                  width: 100%;
                }
                .btn-animation-styles {
                  padding-top: 0.188rem;
                }
                .scroll {
                  margin-bottom: 0.125rem;
                }
                .btn-text {
                  float: right;
                  margin-left: 0.938rem;
                  padding-top: 0.125rem;
                  height: 1.25rem;
                }
              `}
              className="btn-styles btn1"
              as={Link}
              variant={Button.VARIANT.NORMAL}
              to={quickstartUrl}
              rel="noopener noreferrer"
              onClick={trackQuickstart('QuickstartViewRepoClick', quickstart)}
            >
              <div className="btn-animation-styles">
                <div className="scroll scroll-top">
                  <GitHubIconSVG />
                  <div className="btn-text">View repo</div>
                </div>
                <div className="scroll scroll-bottom">
                  <GitHubIconSVG />
                  <div className="btn-text">View repo</div>
                </div>
              </div>
            </Button>
          </div>
          <div
            css={css`
              margin-top: 14px;
            `}
          >
            <Button
              as={ExternalLink}
              variant={Button.VARIANT.NORMAL}
              to="https://developer.newrelic.com/contribute-to-quickstarts/"
              instrumentation={{
                component: 'GlobalFooter',
                eventName: 'instantObservability',
                category: 'BuildYourOwnQuickstartClick',
              }}
              className="btn-styles btn1"
              css={css`
                border-radius: 4px;
                padding: 13.5px 20px 13.5px 22px;
                column-gap: 14.45px;
                font-weight: 400;
                height: 48px;
                @media (max-width: 760px) {
                  width: 100%;
                }
                @media (min-width: 760px) {
                  width: 11.375rem;
                }
                .scroll {
                  margin-bottom: 5px;
                  margin-top: 6px;
                }

                .btn-text {
                  float: right;
                  margin-left: 13px;
                  margin-right: 7px;
                }
              `}
            >
              <div className="btn-animation-styles">
                <div className="scroll scroll-top">
                  <TickIconSVG />
                  <div className="btn-text">Build your own</div>
                </div>
                <div className="scroll scroll-bottom">
                  <TickIconSVG />
                  <div className="btn-text">Build your own</div>
                </div>
              </div>
            </Button>
          </div>
        </div>

        <div
          css={css`
            margin-bottom: 68px;
          `}
        >
          <h6
            css={css`
              height: 32px;
              margin-bottom: 67px;
            `}
          >
            Related resources
          </h6>
          <RelatedResources
            css={css`
              padding: 0;
            `}
            resources={quickstart.relatedResources}
          />
        </div>
      </div>
    </>
  );
};

LandingPageFooter.propTypes = {
  quickstart: quickstart.isRequired,
  trackQuickstart: PropTypes.func,
  tessenSupportTrack: PropTypes.func,
};

export default LandingPageFooter;
