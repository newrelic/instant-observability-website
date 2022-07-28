import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import ReactMarkdown from 'react-markdown';
import Link from '@newrelic/gatsby-theme-newrelic/src/components/Link';

const aTagToLink = ({
  // eslint-disable-next-line no-unused-vars
  node,
  ...props
}) => {
  return (
    <Link
      to={props.href}
      css={css`
        text-decoration: none;
        color: #1d252c;
        font-size: 18px;
        border-bottom: 1px solid #1d252c;
        &:hover {
          color: #1d252c;
        }
      `}
    >
      {props.children}
    </Link>
  );
};
const h2Tag = (props) => {
  return (
    <h3
      css={css`
        line-height: 50px;
        margin-top: 104px;
        font-weight: 500;
      `}
    >
      {' '}
      {props.children}
    </h3>
  );
};
const h3Tag = (props) => {
  return (
    <h6
      css={css`
        line-height: 32px;
        margin-top: 60px;
      `}
    >
      {' '}
      {props.children}
    </h6>
  );
};
const Markdown = ({ className, ...props }) => (
  <ReactMarkdown
    {...props}
    className={className}
    components={{
      a: aTagToLink,
      h2: h2Tag,
      h3: h3Tag,
    }}
  />
);
Markdown.propTypes = {
  className: PropTypes.string,
};

export default Markdown;
