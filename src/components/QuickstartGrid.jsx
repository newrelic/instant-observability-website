import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Button, Surface } from '@newrelic/gatsby-theme-newrelic';
import QuickstartTile from '@components/QuickstartTile';
import { quickstart } from '../types';

const QuickstartGrid = ({ quickstarts, stepSize }) => {
  const [displayed, showMore] = usePagination(quickstarts, stepSize);

  return (
    <>
      {displayed.map((q) => (
        <QuickstartTile key={q.id} {...q} />
      ))}
      {quickstarts.length > displayed.length && (
        <Surface
          base={Surface.BASE.PRIMARY}
          interactive
          css={css`
            border: 1px solid #e4e5e6;
            box-shadow: none;
            display: flex;
          `}
        >
          <Button
            variant={Button.VARIANT.NORMAL}
            css={css`
              border-radius: 8px;
              font-size: 1rem;
              width: 100%;
            `}
            onClick={showMore}
          >
            Show more
          </Button>
        </Surface>
      )}
    </>
  );
};

const usePagination = (quickstarts, size) => {
  const [numDisplayed, setNumDisplayed] = useState(size);
  const [qs, setQs] = useState(quickstarts.slice(0, size));

  useEffect(() => {
    setQs(quickstarts.slice(0, numDisplayed));
  }, [numDisplayed, quickstarts]);

  useEffect(() => {
    setNumDisplayed(size);
  }, [size]);

  const showMore = () => {
    setNumDisplayed(numDisplayed + size + 1);
  };

  return [qs, showMore];
};

QuickstartGrid.propTypes = {
  quickstarts: PropTypes.arrayOf(quickstart),
  stepSize: PropTypes.number,
};

export default QuickstartGrid;
