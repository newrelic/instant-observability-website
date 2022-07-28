import React, { useState } from 'react';
import { css } from '@emotion/react';
import Surface from '@newrelic/gatsby-theme-newrelic/src/components/Surface';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import Spinner from '@newrelic/gatsby-theme-newrelic/src/components/Spinner';
import useInstrumentedHandler from '@newrelic/gatsby-theme-newrelic/src/hooks/useInstrumentedHandler';
import {
  SIGNUP_LINK,
  NR1_GUIDED_INSTALL_NERDLET,
  QUICKSTARTS_COLLAPSE_BREAKPOINT,
} from '@data/constants';
import { navigate } from 'gatsby';
import Cookies from 'js-cookie';
import { getGuidedInstallStackedNr1Url } from '@utils/get-pack-nr1-url';

const GuidedInstallTileMostPopular = () => {
  // used to start the spinner on clicking "Install New Relic" button
  const [startNavigation, setStartNavigation] = useState(false);

  const isReturningUser = Boolean(Cookies.get('ajs_user_id'));

  const handleNavigation = () => {
    const platformUrl = isReturningUser
      ? getGuidedInstallStackedNr1Url(NR1_GUIDED_INSTALL_NERDLET)
      : SIGNUP_LINK;

    navigate(platformUrl);
  };

  const handleButtonClick = useInstrumentedHandler(
    handleNavigation,
    {
      eventName: 'clickSuperTile',
      category: 'QuickstartLanding',
      tile: 'guided',
    },
    'tessen'
  );

  return (
    <Surface
      base={Surface.BASE.PRIMARY}
      css={css`
        padding: 32px;
        overflow: hidden;
        height: 360px;
        min-width: 250px;
        margin: 0 auto;
        border: 1px solid #e4e5e6;
        border-radius: 8px;
        box-shadow: none;
        display: grid;
        align-items: flex-start;
        grid-gap: 0.2rem;
        grid-template-rows: 68px 200px auto;
        grid-template-columns: auto;
        grid-template-areas:
          'heading'
          'summary'
          'install';

        @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          padding: 32px 32px 24px 32px;
          width: 100%;
          min-width: 250px;
        }

        background: #1a3c34;

        h2,
        p {
          color: #f9fafa;

          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            width: 100%;
            font-weight: 400;
          }
        }
      `}
    >
      <div
        css={css`
          grid-area: heading;
        `}
      >
        <h2
          css={css`
            font-weight: normal;
            font-size: 18px;
            line-height: 24px;
            margin: 0;
          `}
        >
          Guided install
        </h2>
        <span
          css={css`
            font-size: 18px;
            line-height: 24px;
            color: #898e91;
          `}
        >
          First step
        </span>
      </div>

      <div
        css={css`
          grid-area: summary;
        `}
      >
        <p
          css={css`
            font-size: 24px;
            letter-spacing: -0.025em;
            line-height: 32px;
            font-weight: 300;

            /* Limit the number of lines */
            word-break: break-word;

            max-height: 8rem;

            /* Limits the number of lines */
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          `}
        >
          Many engineers start here. You'll install an agent with a single
          command and start monitoring your log and infrastructure data in real
          time.
        </p>
      </div>
      <div
        css={css`
          grid-area: install;
          display: flex;
        `}
      >
        <Button
          onClick={() => {
            setStartNavigation(true);
            return handleButtonClick();
          }}
          variant={Button.VARIANT.PRIMARY}
          size={Button.SIZE.SMALL}
          css={css`
            background: none;
            font-weight: 300;
            font-size: 18px;
            padding: 0 0 3px 0;
            color: var(--system-text-primary-dark);
            border-bottom: 1px solid white;
            &:hover {
              background: none;
              color: var(--system-text-primary-dark);
            }
          `}
        >
          Install New Relic
        </Button>
        {startNavigation && (
          <Spinner
            css={css`
              margin-left: 1rem;
              :after {
                width: 2rem;
                height: 2rem;
                border-width: thick;
                display: flex;
                position: initial;
                color: #ffffff;
              }
            `}
          />
        )}
      </div>
    </Surface>
  );
};

GuidedInstallTileMostPopular.propTypes = {};

export default GuidedInstallTileMostPopular;
