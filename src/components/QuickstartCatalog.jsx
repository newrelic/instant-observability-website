import React from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import { css } from '@emotion/react';
import QuickstartCatalogTile from '@components/QuickstartCatalogTile';
import AutoSizer from 'react-virtualized-auto-sizer';
// import autosizer here for dynamic resizing

const QuickstartCatalog = ({ quickstarts }) => {
  return (
    <div
      css={css`
        min-height: 100vh;
        min-width: 100%;
      `}
    >
      <AutoSizer defaultWidth={1920} defaultHeight={1080}>
        {({ width, height }) => {
          const tileWidth = 300;
          const tileHeight = 400;
          const columnCount = Math.floor(width / tileWidth);
          const rowCount = Math.ceil(quickstarts.length / columnCount);
          return (
            <Grid
              height={height}
              width={width}
              columnWidth={tileWidth}
              columnCount={columnCount}
              rowHeight={tileHeight}
              rowCount={rowCount}
              itemData={{ quickstarts, columnCount }}
            >
              {QuickstartCatalogTile}
            </Grid>
          );
        }}
      </AutoSizer>
    </div>
  );
};

export default QuickstartCatalog;
