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
            p {
              line-height: 28px;
            }
            ul {
              margin-bottom: 50px;
              font-size:18px;
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
            @media screen and (max-width: 760px){
              width: fit-content;
              margin: 40px 39px 100px 40px;
              h3{
                line-height: 40px;
                font-size: 36px;
                font-weight: 400;
                margin-bottom: 24px;
              }
            }
              @media screen and (min-width: 760px) {
                margin: 104px 155px 104px  156px;
                h3{
                  margin-bottom: 10px;
                font-weight: 400;
                }
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
