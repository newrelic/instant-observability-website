import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/react';
import { Link } from '@newrelic/gatsby-theme-newrelic';

const Breadcrumbs = ({ segments, separator }) => {
  return (
    <div
      css={css`
        margin: 1rem 0 0;
      `}
      aria-label="breadcrumb"
    >
      {segments.map((segment) => {
        const elem = segment.url ? (
          <Link
            to={segment.url}
            css={css`
              color: var(--brand-highlight-green);
              text-decoration: none;
              &:hover {
                color: var(--brand-highlight-green);
              }
            `}
          >
            {segment.name}
          </Link>
        ) : (
          segment.name
        );
        return (
          <span
            key={`breadcrumb-${segment.name}`}
            css={css`
              :not(:last-of-type):after {
                margin: 0 0.5em;
                display: inline-block;
                content: '${separator}';
              }
            `}
          >
            {elem}
          </span>
        );
      })}
    </div>
  );
};

Breadcrumbs.defaultProps = {
  separator: '/',
};

Breadcrumbs.propTypes = {
  segments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      url: PropTypes.string,
    })
  ).isRequired,
  separator: PropTypes.string,
};

export default Breadcrumbs;
