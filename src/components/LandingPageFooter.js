import React from 'react';
import { Link, Button, PageTools } from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import SupportSection from './SupportSection';
import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import RelatedResources from './RelatedResources';
import TickIconSVG from './Icons/TickIconSVG';
import GitHubIconSVG from './Icons/GitHubIconSVG';
import AnimatedText from './AnimatedText';

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
                --button-background: var(--brand-secondary-background-color);
                --button-text-color: var(--brand-secondary-text-color);
                background-color: var(--button-background);
                border-radius: 4px;
                color: var(--button-text-color);
                background: var(--background-color);
                color: var(--btn-text-color);
                border-radius: 4px;
                font-weight: 400;
                padding: 0px 6px 0px 20px;
                &:hover {
                  background-color: var(--button-background);
                  color: var(--button-text-color);
                  border-color: transparent;
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
              <AnimatedText text={'View repo'} />
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
                height: 48px;
                &:hover {
                  color: var(--white-hover-color);
                  border-color: transparent;
                }

                @media (max-width: 760px) {
                  width: 100%;
                }
              `}
            >
              <TickIconSVG className="Tick" />
              <AnimatedText text={'Build your own'} />
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
};

export default LandingPageFooter;
