import React from 'react';
import QuickstartDocumentation from '../QuickstartDocumentation';
import EmptyTab from '../EmptyTab';
import { css } from '@emotion/react';
import { quickstart } from '../../types';

const Documentation = ({ quickstart }) => {
  return (
    <div
      css={css`
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(1, 1fr);

        @media not all and (min-resolution: 0.001dpcm) and max-width: 760px {
          @media {
            grid-template-columns: repeat(1, 1fr);
            margin-left: 40px;
            margin-right: 23px;
          }
        }

        h6 {
          font-weight: 400;
        }
      `}
    >
      <h6>
        Documentation &nbsp;
        <div
          css={css`
            display: inline-block;
            background: var(--border-color);
            padding: 1px 4px;
            border-radius: 3px;
          `}
        >
          {quickstart.documentation.length}
        </div>
      </h6>
      {quickstart.documentation?.length > 0 ? (
        <QuickstartDocumentation quickstart={quickstart} />
      ) : (
        <EmptyTab
          quickstartUrl={quickstart.packUrl}
          quickstartName={quickstart.title}
          tabName="documentation"
        />
      )}
    </div>
  );
};

Documentation.propTypes = {
  quickstart,
};

export default Documentation;
