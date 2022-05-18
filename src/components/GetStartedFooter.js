import { Button, ExternalLink } from '@newrelic/gatsby-theme-newrelic';
import { DEMO_LINK, SIGNUP_LINK } from '../data/constants';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/react';

const MOBILE_BREAKPOINT = '800px';



const GetStartedFooter = ({
  quickstart,
  location,
  style = 'PRIMARY',
  ...props
}) => {

  const AnimatedText = ({
    text
  }) => {
    return (
      <div
        css={css`
        overflow: hidden;
        line-height: 30px;
        text-align: center;
        margin: 0;
        width: 106px;
        height: 48px;

        > div {
          margin: 10px auto 0;
          white-space: nowrap;
        }
        > span {
          background: none;
          border: 15px solid var(--button-background);
          position: absolute;
          z-index: 100;
          top: 0;
          left: 0;
        }

        .scroll {
          -webkit-animation: scroll-back 0.3s
            cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation: scroll-back 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }
        &:hover .scroll {
          -webkit-animation: scroll 0.3s
            cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
          animation: scroll 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
            forwards;
        }

        --translateY-distance: -40px;

        @-webkit-keyframes scroll {
          0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
          100% {
            -webkit-transform: translateY(var(--translateY-distance));
            transform: translateY(var(--translateY-distance));
          }
        }
        @-webkit-keyframes scroll-back {
          0% {
            -webkit-transform: translateY(var(--translateY-distance));
            transform: translateY(var(--translateY-distance));
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
        }

        @keyframes scroll {
          0% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
          100% {
            -webkit-transform: translateY(var(--translateY-distance));
            transform: translateY(var(--translateY-distance));
          }
        }
        @keyframes scroll-back {
          0% {
            -webkit-transform: translateY(var(--translateY-distance));
            transform: translateY(var(--translateY-distance));
          }
          100% {
            -webkit-transform: translateY(0);
            transform: translateY(0);
          }
        }
      `}
      >
        <span />
        <div className="scroll scroll-top">{text}</div>
        <div className="scroll scroll-bottom">{text}</div>
      </div>
    );
  };


  return (
    <div
      css={css`
        --nr1--color--accent: #1ce783;
        --nr1--color--text--primary: #293338;

        --nr1--color--background--button--primary--enabled: #293338;
        --nr1--color--background--button--primary--hover: #000;
        --nr1--color--text--buttton--primary: #1ce783;

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
          {...props}
          as={ExternalLink}
          variant={Button.VARIANT.PRIMARY}
          href={SIGNUP_LINK}
          css={css`
        --button-background: var(
          ${style === 'PRIMARY'
              ? '--btn-background-green'
              : '--brand-secondary-background-color'}
        );
        --button-text-color: var(
          ${style === 'PRIMARY'
              ? '--brand-primary-text-color'
              : '--brand-secondary-text-color'}
        );
          background-color: var(
              --nr1--color--background--button--primary--enabled
            );
            color: var(--nr1--color--text--buttton--primary);
        border-radius: 4px;
        font-size: 14px;
        line-height: 21px;
        font-weight: 400;
        padding: 1rem;

          &:hover {
              background-color: var(
                --nr1--color--background--button--primary--hover
              );
              color: var(--nr1--color--text--buttton--primary);
            }

       `}
        >
          <AnimatedText
            text={'Sign Up'}
          />

        </Button>
        <Button
          {...props}
          as={ExternalLink}
          variant={Button.VARIANT.PRIMARY}
          href={DEMO_LINK}
          css={css`
          --button-background: var(
            ${style === 'PRIMARY'
              ? '--btn-background-green'
              : '--brand-secondary-background-color'}
          );
          --button-text-color: var(
            ${style === 'PRIMARY'
              ? '--brand-primary-text-color'
              : '--brand-secondary-text-color'}
          );
          background-color: var(
                --nr1--color--background--button--primary-accent--enabled
              );
              color: var(--nr1--color--text--buttton--primary-accent);
              border: 1px solid var(--nr1--color--text--buttton--primary-accent);
          border-radius: 4px;
          font-size: 14px;
          line-height: 21px;
          font-weight: 400;
          padding: 1rem;
  
            &:hover {
                background-color: var(
                  --nr1--color--background--button--primary-accent--hover
                );
                color: var(--nr1--color--text--buttton--primary-accent);
              }
  
         `}
        >
          <AnimatedText
            text={'Get Demo'}
          />

        </Button>
      </div>
    </div>
  );
};

export default GetStartedFooter;
