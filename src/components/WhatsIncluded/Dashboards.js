import { quickstart } from '../../types';
import QuickstartDashboards from '../../components/QuickstartDashboards';
import { css } from '@emotion/react';
import EmptyTab from '../../components/EmptyTab';

const Dashboards = ({ quickstart }) => {
  return (
    <div
      css={css`
        h3 {
          margin-bottom: 58px;
          font-weight: 400;
        }

        h6 {
          font-weight: 400;
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
      <h3>What&apos;s included?</h3>
      <h6>
        Dashboard &nbsp;
        <div
          css={css`
            display: inline-block;
            background: var(--background-grey-color);
            margin: 0px 0px;
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

