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
      @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(2, 40px);
        h3 {
          display: contents;
          font-weight: 400;
          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin-bottom: 45px;
          }
          @media (min-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin-bottom: 47px;
          }
        }
      }
        @media not all and (min-resolution: 0.001dpcm) and max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT} {
          @media {
            grid-template-columns: repeat(1, 1fr);
            margin-left: 40px;
            margin-right: 23px;
          }

    `}
    >
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
        `}
      >
        Share this : &nbsp;
        <Share url={location.href} />
      </div>
    </div>
  );
};

export default WhatsIncludedHeader;
