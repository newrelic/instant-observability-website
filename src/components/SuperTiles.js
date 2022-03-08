import React from 'react';
import { css } from '@emotion/react';
import GuidedInstallTileMostPopular from './GuidedInstallTileMostPopular';

const SuperTiles = () => {
  return (
    <div
      css={css`
        display: grid;
        gap: 16px;
        grid-template-columns: repeat(1, 1fr);
      `}
    >
      <GuidedInstallTileMostPopular />
    </div>
  );
};

export default SuperTiles;
