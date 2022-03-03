import React from 'react';
import {
  Callout,
  GlobalHeader,
  GlobalFooter,
  Layout as ThemeLayout,
  NR_SITES,
} from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import GuidedInstallTile from './../components/GuidedInstallTile';
import IOLogo from '../components/IOLogo';
import '../components/styles.scss';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../data/constants';

const FivehundredErrorPage = () => {
  return (
    <>
      <GlobalHeader activeSite={NR_SITES.IO} />
      <ThemeLayout>
        <ThemeLayout.Sidebar
          css={css`
            grid-area: sidebar;
          `}
        >
          <IOLogo />
          <p>
            A place to find quickstarts of resources like dashboards,
            instrumentation, and alerts to help you monitor your environment.
          </p>
        </ThemeLayout.Sidebar>
        <ThemeLayout.Main
          css={css`
            grid-area: main;
            padding: 72px 100px 0;
            margin: 0 auto;
          `}
        >
          <div
            css={css`
              padding-bottom: 36px;
            `}
          >
            <Callout variant={Callout.VARIANT.IMPORTANT}>
              We are currently experiencing technical issues loading the Instant
              Observability catalog. Please use the guided install tile below to
              start the install process.
            </Callout>
          </div>
          <div
            css={css`
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
            `}
          >
            <GuidedInstallTile />
          </div>
        </ThemeLayout.Main>
      </ThemeLayout>
      <GlobalFooter
        css={css`
          max-width: 100% @media screen and
            (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin-left: 0;
          }
        `}
      />
    </>
  );
};

export default FivehundredErrorPage;
