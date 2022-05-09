import React from 'react';
import { Link, Button, PageTools } from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { quickstart } from '../types';
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
          width: 100%;
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 10px;
          grid-auto-rows: minmax(100px, auto);
          font-size: 18px;

          @media (max-width: 760px) {
            grid-template-columns: repeat(1, 1fr);
          }

          @media (min-width: 760px) {
            h6 {
              margin-bottom: 34px;
              font-weight: 400;
            }
            .collaborate-section {
              margin-bottom: 34px !important;
            }
          }

          @media not all and (min-resolution: 0.001dpcm) and max-width: 760px {
            @media {
              grid-template-columns: repeat(1, 1fr);
              margin-left: 40px;
              margin-right: 23px;
            }
          }
          &: * {
            padding: 1rem;
          }
        `}
      >
        <div>
          <h6>Authors</h6>
          <p>{quickstart.authors.join(', ')}</p>
        </div>

        <div
          css={css`
            padding-bottom: 2rem;
          `}
        >
          <h6>Support</h6>
          <div>
            <SupportSection
              supportLevel={quickstart.level}
              onClick={tessenSupportTrack(quickstart)}
            />
          </div>
        </div>

        <div
          css={css`
            padding-bottom: 2rem;
          `}
        >
          <h6 className="collaborate-section">
            Collaborate on this quickstart
          </h6>
          <div>
            <Button
              css={css`
                background: var(--background-color);

                color: var(--btn-text-color);
                border-radius: 4px;
                padding: 13.5px 20px 13.5px 22px;
                column-gap: 14.45px;
                font-weight: 400;
                &:hover {
                  color: var(--white-hover-color);
                }

                @media (max-width: 760px) {
                  width: 100%;
                }
              `}
              as={Link}
              variant={Button.VARIANT.OUTLINE}
              to={quickstartUrl}
              rel="noopener noreferrer"
              onClick={trackQuickstart('QuickstartViewRepoClick', quickstart)}
            >
              <GitHubIconSVG className="ViewRepo" />
              View repo
            </Button>
          </div>
          <div
            css={css`
              margin-top: 14px;
            `}
          >
            <Button
              as={ExternalLink}
              variant={Button.VARIANT.OUTLINE}
              to="https://developer.newrelic.com/contribute-to-quickstarts/"
              instrumentation={{
                component: 'GlobalFooter',
                eventName: 'instantObservability',
                category: 'BuildYourOwnQuickstartClick',
              }}
              css={css`
                background: var(--background-color);
                color: var(--btn-text-color);
                border-radius: 4px;
                padding: 13.5px 20px 13.5px 22px;
                column-gap: 14.45px;
                font-weight: 400;
                &:hover {
                  color: var(--white-hover-color);
                }

                @media (max-width: 760px) {
                  width: 100%;
                }
              `}
            >
              <TickIconSVG className="Tick" />
              Build your own
            </Button>
          </div>
        </div>

        <div>
          <h6>Related Resources</h6>
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
};

export default LandingPageFooter;
