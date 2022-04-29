import { Button, ExternalLink } from '@newrelic/gatsby-theme-newrelic';

import React from 'react';
import { css } from '@emotion/react';

const MOBILE_BREAKPOINT = '800px';

const GetStartedFooter = () => {
  return (
    <div
      css={css`
        --nr-green: #1ce783;
        --nr-black: #1d252c;

        width: 100%;
        height: 120px;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        font-size: 33px;

        background-color: var(--nr-green);

        > h3 {
          color: var(--nr-black);

          font-family: Söhne-Buch;
          font-size: 44px;
          line-height: 50px;
          letter: -1.5%;
        }

        @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
          height: 315px;
          flex-direction: column;

          > h3 {
            margin-top: 34px;
            width: 296px;
            font-size: 36px;
            line-height: 40px;
            line-spacing: -0.015em;
          }
        }
      `}
    >
      <h3
        css={css`
          margin-bottom: 0px;
        `}
      >
        Get started today for free.
      </h3>
      <div
        css={css`
          display: flex;
          justify-content: flex-start;

          > a {
            font-size: 18px;
            font-weight: 400;
            line-height: 24px;

            width: 142px;
            height: 64px;

            :first-child {
              margin: 0px 8px;
            }
          }

          @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
            height: 315px;
            flex-direction: column;

            > a {
              width: 296px;
              height: 64px;

              :first-child {
                margin: 8px 0px;
              }
            }
          }
        `}
      >
        <Button
          as={ExternalLink}
          href={'https://newrelic.com/signup'}
          css={css`
            background-color: var(--nr-black);
            color: var(--nr-green);
          `}
        >
          Sign Up
        </Button>
        <Button
          as={ExternalLink}
          href={'https://newrelic.com/request-demo'}
          css={css`
            background-color: var(--nr-green);
            color: var(--nr-black);
            border: 1px solid var(--nr-black);
          `}
        >
          Get Demo
        </Button>
      </div>
    </div>
  );
};

export default GetStartedFooter;
