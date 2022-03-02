import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import { Button } from '@newrelic/gatsby-theme-newrelic';
import {
  QUICKSTARTS_COLLAPSE_BREAKPOINT,
} from '../data/constants';

const QuickstartsSidebar = ({
  categoriesWithCount,
  category,
  handleCategory,
}) => (
  <aside
    data-swiftype-index={false}
    css={css`
      grid-area: sidebar;
      height: calc(100vh - var(--global-header-height));
      position: sticky;
      top: var(--global-header-height);

      @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
        display: none;
        position: relative;
        overflow: hidden;
        width: 100%;
        height: 100%;
      }
    `}
  >
    <div
      css={css`
        padding: var(--site-content-padding);
        height: 100%;
        overflow: auto;
        @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          position: relative;
        }
      `}
    >
      <FormControl>
        <Label htmlFor="quickstartCategory">CATEGORIES</Label>
        {categoriesWithCount.map(({ displayName, value, count }) => (
          <Button
            type="button"
            key={value}
            disabled={count === 0}
            onClick={() => handleCategory(value)}
            css={css`
              padding: 1rem 0.5rem;
              width: 100%;
              display: flex;
              justify-content: flex-start;
              color: var(--primary-text-color);
              font-weight: 100;
              background: ${category === value
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
          </FormControl>
    </div>
  </aside>
);

QuickstartsSidebar.propTypes = {
  isMobile: PropTypes.bool,
  categoriesWithCount: PropTypes.array,
  category: PropTypes.string,
  handleCategory: PropTypes.func,
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

export default QuickstartsSidebar;
