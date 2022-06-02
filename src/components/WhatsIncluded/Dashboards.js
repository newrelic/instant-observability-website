import { quickstart } from '../../types';
import QuickstartDashboards from '../../components/QuickstartDashboards';
import { css } from '@emotion/react';
import EmptyTab from '../../components/EmptyTab';
import Share from '../../components/Share';

const Dashboards = ({ quickstart }) => {
  return (
    <div
      css={css`
        h3 {
          
          font-weight: 400;
          @media (max-width: 760px) {
            margin-bottom: 45px;
          }
          @media (min-width: 760px) {
            margin-bottom: 47px;
          }
        }

        h6 {
          font-weight: 400;
          @media (max-width: 760px) {
              padding-top: 60px;
            
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
      <h3>What&apos;s included?

        {/* Share on social media */}
        <div
          css={css`
          @media (min-width: 760px) {
            float: right;
          }
        
        @media (max-width: 760px) {
          --page-margin: 30px;
          float: left;
          margin-top: 19px;
          margin-bottom: 37px;
        }
        `}>
          <p
            css={css`
         display: contents;`}>
            Share this : </p>
          &nbsp;
          <div
            css={css`
              float: right;
              line-height: 0.9;
         `}>
            <Share url={window.location.href} />
          </div>
        </div>

      </h3>
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
