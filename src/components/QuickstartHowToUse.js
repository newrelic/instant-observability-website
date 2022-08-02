import React from 'react';
import PropTypes from 'prop-types';
import Link from '@newrelic/gatsby-theme-newrelic/src/components/Link';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import { LOGIN_LINK, SIGNUP_LINK } from '@data/constants';
import InstallButton from './InstallButton';

const QuickstartHowToUse = ({
  quickstart,
  trackQuickstart,
  location,
  layoutContentSpacing,
}) => {
  return (
    <>
      <div
        css={css`
          ${layoutContentSpacing};
        `}
      >
        <h3
          css={css`
            top: 0;
            width: 100%;
            font-weight: 500;
            padding-bottom: 2rem;
          `}
        >
          How to use this quickstart
        </h3>

        <ul
          css={css`
            font-size: 18px;
            padding-bottom: 2rem;
          `}
        >
          <li
            css={css`
              ::marker {
                color: var(--primary-text-color);
              }
            `}
          >
            <Link
              css={css`
                color: var(--primary-text-color);
                &:hover {
                  color: var(--primary-text-color);
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
                color: var(--primary-text-color);
                &:hover {
                  color: var(--primary-text-color);
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
                color: var(--primary-text-color);
              }
            `}
          >
            Click the install button.
          </li>
          <li
            css={css`
              ::marker {
                color: var(--primary-text-color);
              }
            `}
          >
            Install the quickstart to get started or improve how you monitor
            your environment. They’re filled with pre-built resources like
            dashboards, instrumentation, and alerts.
          </li>
        </ul>
        <div
          css={css`
            @media (max-width: 760px) {
              margin-bottom: 33px;
            }
          `}
        >
          <InstallButton
            quickstart={quickstart}
            location={location}
            buttonStyle="SECONDARY"
          />
        </div>
      </div>
    </>
  );
};

QuickstartHowToUse.propTypes = {
  quickstart: quickstart.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  trackQuickstart: PropTypes.func,
  layoutContentSpacing: PropTypes.object,
};

export default QuickstartHowToUse;
