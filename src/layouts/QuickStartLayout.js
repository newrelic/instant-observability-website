import '../components/styles.scss';
import '../components/fonts.scss';
import '../components/fonts.scss';

import {
  GlobalFooter,
  GlobalHeader,
  NR_SITES,
} from '@newrelic/gatsby-theme-newrelic';
import React, { useEffect, useState } from 'react';

import GetStartedFooter from '../components/GetStartedFooter';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../data/constants';
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
          max-width: 100% @media screen and
            (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin-left: 0;
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
