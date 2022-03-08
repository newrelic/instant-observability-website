import React from 'react';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import CategorySelector from './CategorySelector';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../data/constants';

const QuickstartsSidebar = (props) => (
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
      <CategorySelector {...props} />
    </div>
  </aside>
);

QuickstartsSidebar.propTypes = CategorySelector.propTypes;

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
