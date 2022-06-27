import 'components/styles.scss';

import {
  GlobalFooter,
  GlobalHeader,
  NR_SITES,
} from '@newrelic/gatsby-theme-newrelic';

import GetStartedFooter from '@components/GetStartedFooter';
import Layout from '@components/Layout';
import PropTypes from 'prop-types';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../data/constants';
import React from 'react';
import { css } from '@emotion/react';

const QuickStartLayout = ({ children }) => {
  return (
    <>
      <GlobalHeader activeSite={NR_SITES.IO} />
      <Layout
        css={css`
          --sidebar-width: 0;
        `}
      >
        <Layout.Main
          css={css`
            min-height: 100vh;
            padding: 0;

            > * {
            }
          `}
        >
          {children}
        </Layout.Main>
      </Layout>
      <GetStartedFooter />
      <GlobalFooter
        css={css`
          --footer-height: 570px;

          height: var(--footer-height);
          max-width: 100% @media screen and
            (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin-left: 0;
          }

          @media screen and (max-width: 920px) {
            --footer-height: 72rem;
          }
        `}
      />
    </>
  );
};

QuickStartLayout.propTypes = {
  children: PropTypes.node,
};

export default QuickStartLayout;
