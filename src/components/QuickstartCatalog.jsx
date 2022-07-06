import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Button } from '@newrelic/gatsby-theme-newrelic';
import QuickstartTile from '@components/QuickstartTile';

const QuickstartCatalog = ({ quickstarts }) => {
  const [displayed, showMore] = usePagination(quickstarts, 10);

  return (
    <>
      {displayed.map((q) => (
        <QuickstartTile key={q.id} featured={false} {...q} />
      ))}
      <div
        css={css`
          display: flex;
          flex-direction: row;
        `}
      >
        <Button onClick={showMore}>Show more</Button>
      </div>
    </>
  );
};

const usePagination = (quickstarts, size) => {
  const [numDisplayed, setNumDisplayed] = useState(size);
  const [qs, setQs] = useState(quickstarts.slice(0, size));

  useEffect(() => {
    setQs(quickstarts.slice(0, numDisplayed));
  }, [numDisplayed, quickstarts]);

  const showMore = () => {
    setNumDisplayed(numDisplayed + size);
  };

  return [qs, showMore];
};

export default QuickstartCatalog;
