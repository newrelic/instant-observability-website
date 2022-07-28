import '@components/styles.scss';

import GlobalFooter from '@newrelic/gatsby-theme-newrelic/src/components/GlobalFooter';
import GlobalHeader, { NR_SITES } from '@newrelic/gatsby-theme-newrelic/src/components/GlobalHeader';

import GetStartedFooter from '@components/GetStartedFooter';
import Layout from '@components/Layout';
import PropTypes from 'prop-types';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '@data/constants';
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
          padding-bottom: 3rem;
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
