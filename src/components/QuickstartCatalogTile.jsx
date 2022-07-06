import React, { memo } from 'react';
import QuickstartTile from '@components/QuickstartTile';
import { areEqual } from 'react-window';

const QuickstartCatalogTile = memo(({ rowIndex, columnIndex, style, data }) => {
  const { quickstarts, columnCount } = data;
  const dataIndex = rowIndex * columnCount + columnIndex;

  const quickstart = quickstarts[dataIndex];
  const styling = {
    paddingLeft: '2rem',
    paddingRight: '2rem',
    ...style,
  };
  return (
    <div style={styling}>
      <QuickstartTile featured={false} {...quickstart} />
    </div>
  );
}, areEqual);

export default QuickstartCatalogTile;
