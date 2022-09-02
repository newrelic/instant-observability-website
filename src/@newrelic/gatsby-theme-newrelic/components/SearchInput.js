import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Icon from '@newrelic/gatsby-theme-newrelic/src/components/Icon';
import useKeyPress from '@newrelic/gatsby-theme-newrelic/src/hooks/useKeyPress';
import useSyncedRef from '../hooks/useSyncedRef';
import composeHandlers from '../utils/composeHandlers';

const SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
};

const ICONS = {
  FILTER: 'fe-filter',
  SEARCH: 'fe-search',
};

const HORIZONTAL_SPACING = {
  [SIZES.SMALL]: '0.5rem',
  [SIZES.MEDIUM]: '1rem',
  [SIZES.LARGE]: '1rem',
};

const SearchInput = forwardRef(
  (
    {
      focusWithHotKey,
      onClear,
      onSubmit,
      value,
      width,
      size = 'medium',
      className,
      iconName = 'fe-search',
      onBlur,
      onFocus,
      ...props
    },
    ref
  ) => {
    const inputRef = useSyncedRef(ref);
    const [showHotKey, setShowHotkey] = useState(Boolean(focusWithHotKey));

    useKeyPress(focusWithHotKey, (e) => {
      e.preventDefault();

      inputRef.current.focus();
    });

    return (
      <div
        width={width}
        className={className}
        css={css`
          --horizontal-spacing: ${HORIZONTAL_SPACING[size]};

          position: relative;
          width: ${width || '100%'};
          box-shadow: var(--shadow-1);
          ${size && styles.size[size].container}
        `}
      >
        <Icon
          css={css`
            position: absolute;
            left: var(--horizontal-spacing);
            top: 50%;
            transform: translateY(-50%);
          `}
          name={iconName}
          size={styles.size[size].icon}
        />
        <input
          id="catalogueSearch"
          ref={inputRef}
          value={value}
          {...props}
          type="text"
          onFocus={composeHandlers(onFocus, () => setShowHotkey(false))}
          onBlur={composeHandlers(onBlur, () =>
            setShowHotkey(Boolean(focusWithHotKey))
          )}
          onKeyDown={(e) => {
            switch (e.key) {
              case 'Escape':
                onClear && onClear();
                e.target.blur();
                break;
              case 'Enter':
                return onSubmit?.(value);
              default:
              // do nothing
            }
          }}
          css={css`
            width: 100%;
            border: 1px solid var(--border-color);
            border-radius: 4px;
            background: ${'var(--background-color)' ||
            'var(--primary-background-color)'};
            color: var(--primary-text-color);
            transition: 0.15s ease-out;
            line-height: 1;

            padding-left: calc(
              var(--horizontal-spacing) + 0.5rem + var(--icon-size)
            );
            padding-right: calc(
              var(--horizontal-spacing) + 0.5rem + var(--icon-size)
            );

            ${size && styles.size[size].input}

            &:focus {
              outline: none;
              border: 1px solid rgba(0, 126, 138, 0.6);
              box-shadow: 0 0 0 4px rgba(0, 126, 138, 0.1);
            }
          `}
        />
        {/* search button - start */}
        {value && onSubmit && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onSubmit(value);
            }}
            css={css`
              right: 3rem;
              top: 50%;
              transform: translateY(-50%);
              &:hover {
                cursor: pointer;
              }
              color: var(--primary-text-color);
              border: none;
              background: transparent;
              position: absolute;
              margin: 0;
              padding: 0;
              outline: none;
            `}
            type="button"
          >
            <Icon
              name={iconName}
              css={css`
                display: block;
              `}
              size={styles.size[size].icon}
            />
          </button>
        )}
        {/* search button - end */}
        {/* close button - start */}
        {value && onClear && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onClear();
            }}
            css={css`
              right: var(--horizontal-spacing);
              top: 50%;
              transform: translateY(-50%);
              &:hover {
                cursor: pointer;
              }

              color: var(--primary-text-color);
              border: none;
              background: transparent;
              position: absolute;
              margin: 0;
              padding: 0;
              outline: none;
            `}
            type="button"
          >
            <Icon
              name="fe-x"
              css={css`
                display: block;
              `}
              size={styles.size[size].icon}
            />
          </button>
        )}
        {/* close button - end */}
        {showHotKey && (
          <span
            className="search-hotkey"
            css={css`
              position: absolute;
              right: var(--horizontal-spacing);
              top: 50%;
              transform: translateY(-50%);
              border: 1px solid var(--border-color);
              line-height: 1rem;
              text-align: center;
              background: var(--color-neutrals-100);

              .dark-mode & {
                background: var(--color-dark-200);
              }
              ${styles.size[size].hotkey}
            `}
          >
            {focusWithHotKey}
          </span>
        )}
      </div>
    );
  }
);

SearchInput.propTypes = {
  className: PropTypes.string,
  focusWithHotKey: PropTypes.string,
  onClear: PropTypes.func,
  onSubmit: PropTypes.func,
  value: PropTypes.string,
  width: PropTypes.string,
  size: PropTypes.oneOf(Object.values(SIZES)),
  iconName: PropTypes.oneOf(Object.values(ICONS)),
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
};

SearchInput.SIZE = SIZES;
SearchInput.ICONS = ICONS;

export default SearchInput;

const styles = {
  size: {
    [SIZES.SMALL]: {
      input: css`
        font-size: 0.75rem;
        padding-top: 0.25rem;
        padding-bottom: 0.25rem;
      `,
      container: css`
        --icon-size: 0.75rem;
      `,
      hotkey: css`
        border-radius: 0.125rem;
        font-size: 0.675rem;
        padding: 0.0625rem 0.3125rem;
      `,
      icon: '0.75rem',
    },
    [SIZES.MEDIUM]: {
      input: css`
        font-size: 0.875rem;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
      `,
      container: css`
        --icon-size: 1rem;
      `,
      hotkey: css`
        border-radius: 0.125rem;
        font-size: 0.875rem;
        padding: 0.125rem 0.375rem;
      `,
      icon: '0.875rem',
    },
    [SIZES.LARGE]: {
      input: css`
        font-size: 1.25rem;
        font-weight: 500;
        padding-top: 0.75rem;
        padding-bottom: 0.75rem;
      `,
      container: css`
        --icon-size: 1.5rem;
      `,
      hotkey: css`
        border-radius: 0.125rem;
        font-size: 1.25rem;
        padding: 0.125rem 0.4375rem;
      `,
      icon: '1.25rem',
    },
  },
};
