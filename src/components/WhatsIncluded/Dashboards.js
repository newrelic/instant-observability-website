import { quickstart } from '../../types';
import QuickstartDashboards from '../../components/QuickstartDashboards';
import { css } from '@emotion/react';
import EmptyTab from '../../components/EmptyTab';
import Share from '../../components/Share';
import { useLocation } from "@reach/router";
import { QUICKSTARTS_COLLAPSE_BREAKPOINT, MIN_WIDTH_BREAKPOINT } from '../../data/constants';

const Dashboards = ({ quickstart }) => {
  const location = useLocation();
  return (
    <div
      css={css`
        h3 {   
          font-weight: 400;
          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin-bottom: 45px;
          }
          @media (min-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin-bottom: 47px;
          }
        }

        h6 {
          font-weight: 400;
          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
              padding-top: 45px; 
          }
          @media (max-width: ${MIN_WIDTH_BREAKPOINT}) {
            padding-top: 80px;
          }
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
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto, 1fr);
          grid-auto-flow: column;
          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            grid-template-columns: repeat(1, 1fr);
              grid-template-rows: repeat(2, 40px);
            h3 {
              display: contents;
            }
          }
      `}>
        <h3>What&apos;s included?</h3>

        {/* Share on social media */}
        <div
          css={css`
          display: inline-flex;
          line-height: 3.9;
          justify-content: end;
          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            justify-content: left;
          }
          @media (max-width: ${MIN_WIDTH_BREAKPOINT}) {
            padding-top: 40px;
          }
        `}>
          Share this : &nbsp;
          <Share url={location.href} />

        </div>
      </div>

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
