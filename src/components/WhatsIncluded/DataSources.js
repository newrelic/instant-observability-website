import React from 'react';
import QuickstartDataSources from '../QuickstartDataSources';
import EmptyTab from '../EmptyTab';
import { css } from '@emotion/react';
import { quickstart } from '../../types';

const DataSources = ({ quickstart }) => {
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
        Data Sources &nbsp;
        <div
          css={css`
            display: inline-block;
            background: var(--background-grey-color);
            padding: 1px 4px;
            border-radius: 3px;
          `}
        >
          {quickstart.documentation.length}
        </div>
      </h6>
      {quickstart.documentation?.length > 0 ? (
        <QuickstartDataSources quickstart={quickstart} />
      ) : (
        <EmptyTab
          quickstartUrl={quickstart.packUrl}
          quickstartName={quickstart.title}
          tabName="data sources"
        />
      )}
    </div>
  );
};

DataSources.propTypes = {
  quickstart,
};

export default DataSources;
