import { css } from '@emotion/react';
import ReactMarkdown from 'react-markdown';

import { Link } from '@newrelic/gatsby-theme-newrelic';

const aTagToLink = ({ ...props }) => {
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

const Markdown = ({ className, children, ...props }: MarkdownProps) => (
  <ReactMarkdown
    {...props}
    children={children}
    className={className}
    css={css`
      > *:first-child {
        margin-top: 0;
      }
    `}
    components={{
      a: aTagToLink,
    }}
  />
);

interface MarkdownProps extends ReactMarkdown.ReactMarkdownOptions {
  className: string;
  children: string;
}

export default Markdown;
