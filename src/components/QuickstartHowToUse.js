import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import { LOGIN_LINK, SIGNUP_LINK } from '../data/constants';
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
            font-weight: 400;
            padding-bottom: 2rem;
          `}
        >
          How to use this quickstart
        </h3>

        <ul
          css={css`
            color: var(--black-text-color);
            font-size: 18px;
            padding-bottom: 2rem;
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
