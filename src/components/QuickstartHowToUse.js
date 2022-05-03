import React from 'react';
import { Link, PageTools } from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import { LOGIN_LINK, SIGNUP_LINK } from '../data/constants';
import InstallButton from './InstallButton';

const QuickstartHowToUse = ({ quickstart, trackQuickstart, location }) => {
  return (
    <>
      <div
        css={css`
          @media screen and (min-width: 760px) {
            margin-left: 156px;
            margin-right: 155px;
          }

          @media screen and (max-width: 760px) {
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            margin-left: 40px;
            margin-right: 23px;
          }
        `}
      >
        <PageTools.Section>
          <div
            css={css`
              top: 0;
              padding-top: 0.5rem;
              height: 2.5rem;
              width: 100%;
              @media screen and (max-width: 760px) {
                padding-bottom: 58px !important;
              }
            `}
          >
            <h1 css={css``}>How to use this quickstart</h1>
          </div>
        </PageTools.Section>

        <PageTools.Section>
          <ul
            css={css`
              color: var(--black-text-color);
            `}
          >
            <li
              css={css`
                ::marker {
                  color: var(--link-font-color);
                }
              `}
            >
              <Link
                css={css`
                  color: var(--link-font-color);
                  &:hover {
                    color: var(--hover-color);
                  }
                `}
                to={SIGNUP_LINK}
                onClick={trackQuickstart(
                  'QuickstartDetailsSignUpClick',
                  quickstart
                )}
              >
                Sign Up
              </Link>{' '}
              for a free New Relic account or{' '}
              <Link
                css={css`
                  color: var(--link-font-color);
                  &:hover {
                    color: var(--hover-color);
                  }
                `}
                to={LOGIN_LINK}
                onClick={trackQuickstart(
                  'QuickstartDetailsLoginClick',
                  quickstart
                )}
              >
                Log In
              </Link>{' '}
              to your existing account.
            </li>
            <li
              css={css`
                ::marker {
                  color: var(--link-font-color);
                }
              `}
            >
              Click the install button.
            </li>
            <li
              css={css`
                ::marker {
                  color: var(--link-font-color);
                }
              `}
            >
              Install the quickstart to get started or improve how you monitor
              your environment. They’re filled with pre-built resources like
              dashboards, instrumentation, and alerts.
            </li>
          </ul>
        </PageTools.Section>

        <PageTools.Section>
          <InstallButton
            quickstart={quickstart}
            location={location}
            css={css`
              background: var(--background-color);
              &:hover {
                background-color: #1d252c;
              }
            `}
          />
        </PageTools.Section>
      </div>
    </>
  );
};

QuickstartHowToUse.propTypes = {
  quickstart: quickstart.isRequired,
};

export default QuickstartHowToUse;
