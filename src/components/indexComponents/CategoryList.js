import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { Button, Spinner } from '@newrelic/gatsby-theme-newrelic';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '@data/constants';

const CategoryList = ({
  category,
  categoriesWithCount,
  handleSearchAndCategory,
  search,
}) => {
  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    setLoadComplete(true);
  }, []);

  return (
    <div
      css={css`
        padding: 24px 0 32px 32px;
        height: 100%;
        overflow: auto;

        label {
          font-size: 28px;
          line-height: 36px;
          font-weight: 300;
          margin-bottom: 23px;
          letter-spacing: -0.5px;
        }
        @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          position: relative;
        }
      `}
    >
      <FormControl>
        <Label htmlFor="quickstartCategory">Categories</Label>
        {!loadComplete && <Spinner />}
        {loadComplete &&
          categoriesWithCount.map(({ displayName, value, count }) => (
            <Button
              type="button"
              key={value}
              disabled={count === 0}
              variant={Button.VARIANT.PRIMARY}
              onClick={() => handleSearchAndCategory(value, search)}
              css={css`
                padding: 8px 12px;
                font-size: 18px;
                font-weight: 300;
                line-height: 54px;
                width: 100%;
                display: flex;
                justify-content: flex-start;
                color: var(--primary-text-color);
                border-radius: 3px;
                background: ${category === value
                  ? 'var(--divider-color)'
                  : 'none'};
                &:hover {
                  background: var(--divider-color);
                }
              `}
            >
              {`${displayName}`}
              <span
                css={css`
                  padding-left: 0.25rem;
                `}
              >{`(${count})`}</span>
            </Button>
          ))}
      </FormControl>
    </div>
  );
};

const FormControl = ({ children }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `}
  >
    {children}
  </div>
);

FormControl.propTypes = {
  children: PropTypes.node,
};

const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    css={css`
      display: block;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--primary-text-color);
    `}
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
};

CategoryList.propTypes = {
  category: PropTypes.string,
  categoriesWithCount: PropTypes.array,
  handleSearchAndCategory: PropTypes.func,
  search: PropTypes.string,
};

export default CategoryList;
