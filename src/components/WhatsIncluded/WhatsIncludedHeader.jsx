import React from 'react';
import { css } from '@emotion/react';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '@data/constants';

const WhatsIncludedHeader = () => (
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
        font-weight: 500;
      `}
    >
      What&apos;s included?
    </h3>
  </div>
);

export default WhatsIncludedHeader;
