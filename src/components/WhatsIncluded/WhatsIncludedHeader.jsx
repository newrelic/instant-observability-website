import React from 'react';
import { css } from '@emotion/react';
import Share from '@components/Share';
import { useLocation } from '@reach/router';
import {
  QUICKSTARTS_COLLAPSE_BREAKPOINT,
  MIN_WIDTH_BREAKPOINT,
} from '@data/constants';

const WhatsIncludedHeader = () => {
  const location = useLocation();
  return (
    <div
      css={css`
        display: grid;
        grid-template-columns: repeat(auto, 1fr);
        grid-auto-flow: column;
        margin-top: 3rem;

        @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          grid-template-columns: repeat(1, 1fr);
          grid-template-rows: repeat(2, 40px);
          margin-bottom: 3rem;
        }
      `}
    >
      <h3
        css={css`
          font-weight: 400;
        `}
      >
        What&apos;s included?
      </h3>

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
        `}
      >
        Share this : &nbsp;
        <Share url={location.href} />
      </div>
    </div>
  );
};

export default WhatsIncludedHeader;
