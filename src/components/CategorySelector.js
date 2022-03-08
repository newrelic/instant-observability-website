import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { Button } from '@newrelic/gatsby-theme-newrelic';

const CategorySelector = ({
  categoriesWithCount,
  category,
  handleCategory,
  totalQuickstartCount,
}) => (
  <FormControl>
    <Label htmlFor="quickstartCategory">Categories</Label>
    <div
      css={css`
        overflow-y: scroll;
        padding-bottom: 3rem;
        width: 100%;
      `}
    >
      <Button
        type="button"
        key="all"
        disabled={totalQuickstartCount === 0}
        onClick={() => handleCategory([])}
        css={css`
          padding: 1rem 0.5rem;
          width: 100%;
          display: flex;
          justify-content: flex-start;
          color: var(--primary-text-color);
          font-weight: 100;
          background: ${category === [].toString()
            ? 'var(--divider-color)'
            : 'none'};
        `}
      >
        All
        <span
          css={css`
            color: var(--secondary-text-color);
            padding-left: 0.25rem;
          `}
        >{`(${totalQuickstartCount})`}</span>
      </Button>

      {categoriesWithCount.map(({ displayName, terms, slug, count }) => (
        <Button
          type="button"
          key={slug}
          disabled={count === 0}
          onClick={() => handleCategory(terms)}
          css={css`
            padding: 1rem 0.5rem;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            color: var(--primary-text-color);
            font-weight: 100;
            background: ${category === terms.toString()
              ? 'var(--divider-color)'
              : 'none'};
          `}
        >
          {`${displayName}`}
          <span
            css={css`
              color: var(--secondary-text-color);
              padding-left: 0.25rem;
            `}
          >{`(${count})`}</span>
        </Button>
      ))}
    </div>
  </FormControl>
);

CategorySelector.propTypes = {
  categoriesWithCount: PropTypes.array.isRequired,
  category: PropTypes.string.isRequired,
  handleCategory: PropTypes.func.isRequired,
  totalQuickstartCount: PropTypes.number.isRequired,
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

export default CategorySelector;
