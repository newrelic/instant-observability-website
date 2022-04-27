import React from 'react';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import Markdown from './Markdown';

const allowedElements = [
  'h1',
  'h2',
  'h3',
  'ol',
  'ul',
  'li',
  'p',
  'blockquote',
  'code',
  'a',
  'strong',
  'em',
  'hr',
];

const QuickstartOverview = ({ quickstart }) => {
  return (
    <>
      {quickstart.description && (
        <div
          css={css`
            color: #1d252c;
            h2 {
              font-size: 44px;
              line-height: 50px;
             
              margin-top: 104px;
            }
            h3 {
              font-size: 24px;
              line-height: 32px;
              margin-top: 60px;
            }
            p {
              font-size: 18px;
              line-height: 28px;

              a {
                color: #1d252c;
              }
            }
            ul {
              margin-bottom: 50px;
              li {
                ::marker {
                  color: #1d252c;
                }
              }
            }
          `}
        >
          <Markdown
            skipHtml
            allowedElements={allowedElements}
            css={css`
              width: fit-content;
              margin: 40px;
              @media screen and (min-width: 1440px) {
                margin: 104px 156px;
              }
            `}
          >
            {quickstart.description}
          </Markdown>
        </div>
      )}
    </>
  );
};

QuickstartOverview.propTypes = {
  quickstart: quickstart.isRequired,
};

export default QuickstartOverview;