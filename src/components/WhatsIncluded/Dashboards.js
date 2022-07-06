import React from 'react';
import { quickstart } from '../../types';
import QuickstartDashboards from '../QuickstartDashboards';
import { css } from '@emotion/react';
import EmptyTab from '../EmptyTab';
import Share from '@components/Share';
import { useLocation } from '@reach/router';
import {
  QUICKSTARTS_COLLAPSE_BREAKPOINT,
  MIN_WIDTH_BREAKPOINT,
} from '@data/constants';

const Dashboards = ({ quickstart }) => {
  const location = useLocation();
  return (
    <div
      css={css`
        h6 {
          font-weight: 400;
        }

        @media not all and (min-resolution: 0.001dpcm) and max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT} {
          @media {
            grid-template-columns: repeat(1, 1fr);
            margin-left: 40px;
            margin-right: 23px;
          }
        }
      `}
    >
      <h6>
        Dashboard &nbsp;
        <div
          css={css`
            display: inline-block;
            background: var(--background-grey-color);
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

export default Dashboards;
