import { Button, ExternalLink } from '@newrelic/gatsby-theme-newrelic';
import { DEMO_LINK, SIGNUP_LINK } from '../data/constants';

import React from 'react';
import { css } from '@emotion/react';

const MOBILE_BREAKPOINT = '800px';

const GetStartedFooter = () => {
  return (
    <div
      css={css`
        --nr1--color--accent: #1ce783;
        --nr1--color--text--primary: #293338;

        --nr1--color--background--button--primary--enabled: #293338;
        --nr1--color--background--button--primary--hover: #000;
        --nr1--color--text--buttton--primary: #fafbfb;

        --nr1--color--background--button--primary-accent--enabled: #1CE78;
        --nr1--color--background--button--primary-accent--hover: #00ce7c;
        --nr1--color--text--buttton--primary-accent: #000;

        width: 100%;
        height: 120px;

        display: flex;
        justify-content: space-evenly;
        align-items: center;

        font-size: 33px;

        background-color: var(--nr1--color--accent);

        > h3 {
          color: var(--nr1--color--text--primary);

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

            :first-of-type {
              margin: 0px 8px;
            }
          }

          @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
            height: 315px;
            flex-direction: column;

            > a {
              width: 296px;
              height: 64px;

              :first-of-type {
                margin: 8px 0px;
              }
            }
          }
        `}
      >
        <Button
          as={ExternalLink}
          variant={Button.VARIANT.PRIMARY}
          href={SIGNUP_LINK}
          css={css`
            background-color: var(
              --nr1--color--background--button--primary--enabled
            );
            color: var(--nr1--color--text--buttton--primary);

            &:hover {
              background-color: var(
                --nr1--color--background--button--primary--hover
              );
              color: var(--nr1--color--text--buttton--primary);
            }
          `}
        >
          Sign Up
        </Button>
        <Button
          as={ExternalLink}
          variant={Button.VARIANT.PRIMARY}
          href={DEMO_LINK}
          css={css`
            background-color: var(
              --nr1--color--background--button--primary-accent--enabled
            );
            color: var(--nr1--color--text--buttton--primary-accent);
            border: 1px solid var(--nr1--color--text--buttton--primary-accent);

            &:hover {
              background-color: var(
                --nr1--color--background--button--primary-accent--hover
              );
              color: var(--nr1--color--text--buttton--primary-accent);
            }
          `}
        >
          Get Demo
        </Button>
      </div>
    </div>
  );
};

export default GetStartedFooter;
