import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import ReactMarkdown from 'react-markdown';

import { Link } from '@newrelic/gatsby-theme-newrelic';

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
      `}
      displayExternalIcon
    >
      {props.children}
    </Link>
  );
};
const h2Tag=({
  node,
  ...props 
})=>{
  return(
    <h3
    css={css`
    line-height: 50px;
    margin-top: 104px;
    `}
    > {props.children}</h3>
  )
}
const h3Tag=({
  node,
  ...props 
})=>{
  return(
    <h6
    css={css`
    line-height: 32px;
    margin-top: 60px;
    `}
    > {props.children}</h6>
  )
}
const Markdown = ({ className, ...props }) => (
  <ReactMarkdown
    {...props}
    className={className}
    components={{
      a: aTagToLink,
      h2:h2Tag,
      h3:h3Tag
    }}
  />
);

Markdown.propTypes = {
  className: PropTypes.string,
};

export default Markdown;
