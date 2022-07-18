import React from 'react';
import { graphql } from 'gatsby';
import { quickstart } from '../../types';
import QuickstartDashboards from '../QuickstartDashboards';
import { css } from '@emotion/react';
import EmptyTab from '../EmptyTab';

const Dashboards = ({ quickstart }) => {
  return (
    <div>
      <h6
        css={css`
          font-weight: 400;
        `}
      >
        Dashboard &nbsp;
        <div
          css={css`
            display: inline-block;
            background: var(--border-color);
            padding: 1px 6px;
            border-radius: 3px;
          `}
        >
          {quickstart.dashboards.length}
        </div>
      </h6>
      {quickstart.dashboards?.length > 0 ? (
        <QuickstartDashboards quickstart={quickstart} />
      ) : (
        <EmptyTab
          quickstartUrl={quickstart.packUrl}
          quickstartName={quickstart.title}
          tabName="dashboards"
        />
      )}
    </div>
  );
};

Dashboards.propTypes = {
  quickstart: quickstart.isRequired,
};

export const fragmentQuery = graphql`
  fragment Dashboards_quickstart on Quickstarts {
    title
    packUrl
    ...QuickstartDashboards_quickstart
  }
`;

export default Dashboards;
