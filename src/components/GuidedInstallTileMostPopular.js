import React from 'react';
import { css } from '@emotion/react';
import {
  Surface,
  Button,
  useInstrumentedHandler,
} from '@newrelic/gatsby-theme-newrelic';
import { SIGNUP_LINK, NR1_GUIDED_INSTALL_NERDLET } from '../data/constants';
import { navigate } from 'gatsby';
import Cookies from 'js-cookie';
import { getGuidedInstallStackedNr1Url } from '../utils/get-pack-nr1-url';

const GuidedInstallTileMostPopular = () => {
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
        grid-template-rows:
          var(--tile-heading-height) var(--title-row-height)
          80px auto;
        min-height: 280px;
        position: relative;
        --tile-heading-height: 100px; /* heading image height */
        --title-row-height: auto; /* Title height to allow space for longer string */
        padding: 1rem;
        overflow: hidden;
        border-radius: 8px;

        /* Default grid view */
        grid-gap: 0.2rem;
        grid-template-rows: var(--tile-heading-height) var(--title-row-height) 1fr auto;

        background: var(--color-brand-700);
      `}
    >
      <div
        css={css`
            grid-area: heading
            height: var(--tile-heading-height);
        `}
      >
        <span
          css={css`
            color: #faa44a;
            font-size: 14px;
            line-height: 20px;
          `}
        >
          First step
        </span>
        <h2
          css={css`
            font-size: 24px;
            font-weight: 600;
            line-height: 30px;
            color: var(--color-white);
          `}
        >
          Guided install
        </h2>
      </div>

      <div
        css={css`
          grid-area: summary;
        `}
      >
        <p
          css={css`
            font-size: 0.8rem;
            color: var(--secondary-text-color);

            /* Limit the number of lines */
            word-break: break-word;
            /* line-height: 16px; */
            max-height: 8rem;

            /* Limits the number of lines */
            overflow: hidden;
            display: -webkit-box;
            text-overflow: ellipsis;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 5;
          `}
        >
          Many engineers start here. You'll install an agent with a single
          command and start monitoring your log and infrastructure data in real
          time.
        </p>
      </div>
      <div
        css={css`
          position: absolute;
          bottom: 1rem;
        `}
      >
        <Button
          onClick={handleButtonClick}
          variant={Button.VARIANT.PRIMARY}
          size={Button.SIZE.SMALL}
        >
          Install New Relic
        </Button>
      </div>
    </Surface>
  );
};

GuidedInstallTileMostPopular.propTypes = {};

export default GuidedInstallTileMostPopular;
