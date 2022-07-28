import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import Icon from '@newrelic/gatsby-theme-newrelic/src/components/Icon';
import Spinner from '@newrelic/gatsby-theme-newrelic/src/components/Spinner';
import Overlay from '@components/Overlay';

import getDisplayName from '@utils/getDisplayName';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '@data/constants';

const CategoryDropdown = ({ category, categoriesWithCount, handleParam }) => {
  const [isCategoriesOverlayOpen, setIsCategoriesOverlayOpen] = useState(false);
  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    setLoadComplete(true);
  }, []);

  const closeCategoriesOverlay = () => {
    setIsCategoriesOverlayOpen(false);
  };

  return (
    <div
      css={css`
        display: flex;
        @media screen and (min-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          display: none;
        }
      `}
    >
      <Button
        css={css`
          width: 100%;
          border-radius: 4px;
          border: 1px solid #1d252c;
          color: var(--primary-text-color);
          font-weight: 400;
          font-size: 18px;
          justify-content: flex-start;
          margin: 10px 10px 30px;
          padding: 20px 24px;
          display: flex;
          justify-content: space-between;
        `}
        variant={Button.VARIANT.LINK}
        onClick={() => setIsCategoriesOverlayOpen(true)}
      >
        {getDisplayName('')}
        <Icon
          css={css`
            color: #1d252c;
            width: 20px;
            transform: rotate(-90deg);
            margin: -4px;
          `}
          name="fe-chevron-left"
          size="120%"
        />
      </Button>
      <Overlay
        isOpen={isCategoriesOverlayOpen}
        onCloseOverlay={closeCategoriesOverlay}
      >
        <div
          css={css`
            --divider-color: #e4e5e6;

            border-radius: 5px;
            position: relative;
            width: 100%;
            margin: 30% auto 0;
            padding: 1rem;
            background: var(--primary-background-color);
          `}
        >
          <h3
            css={css`
              padding: 0.5rem 0 0 0.5rem;
              font-size: 28px;
              line-height: 36px;
              margin-bottom: 12px;
              letter-spacing: -0.5px;
              font-weight: normal;
            `}
          >
            Category
          </h3>
          <div
            css={css`
              max-height: 400px;
              padding-bottom: 3rem;
              overflow-y: scroll;
            `}
          >
            {!loadComplete && <Spinner />}
            {loadComplete &&
              categoriesWithCount.map(({ displayName, value, count }) => (
                <Button
                  type="button"
                  key={value}
                  variant={Button.VARIANT.PRIMARY}
                  onClick={() => handleParam('category')(value)}
                  css={css`
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    color: var(--primary-text-color);
                    border-radius: 3px;
                    padding: 8px 12px;
                    font-size: 18px;
                    line-height: 54px;
                    background: ${category === value
                      ? 'var(--divider-color)'
                      : 'none'};
                    &:hover {
                      background: var(--divider-color);
                    }
                  `}
                >
                  {`${displayName} (${count})`}
                </Button>
              ))}
          </div>
          <div
            css={css`
              background: var(--divider-color);
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 4rem;
              border-bottom-right-radius: 5px;
              border-bottom-left-radius: 5px;
              display: flex;
              justify-content: flex-end;
              align-items: center;
            `}
          >
            <Button
              css={css`
                height: 2rem;
                margin-right: 1rem;
              `}
              onClick={closeCategoriesOverlay}
              variant={Button.VARIANT.NORMAL}
            >
              Cancel
            </Button>
          </div>
        </div>
      </Overlay>
    </div>
  );
};

CategoryDropdown.propTypes = {
  category: PropTypes.string,
  categoriesWithCount: PropTypes.array,
  handleParam: PropTypes.func,
};

export default CategoryDropdown;
