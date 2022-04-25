import React from 'react';
import {
  Link,
  PageTools,
} from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import {
  LOGIN_LINK,
  SIGNUP_LINK,
} from '../data/constants';
import InstallButton from './InstallButton';

const QuickstartHowToUse = ({
  quickstart,
  trackQuickstart,
  location
}) => {
  return (
    <>
      <div
        css={css`
          @media screen and (min-width: 760px){
            margin-left: 156px;
          }

          @media screen and (max-width: 760px){
            display: grid;
            grid-template-columns: repeat(1, 1fr);
            margin-left: 40px;
            margin-right: 23px;
        }
        `}>
        <PageTools.Section>
          <div
            css={css`
            top: 0;
            padding-top: 0.5rem;
            height: 2.5rem;
            width: 100%;
            @media screen and (max-width: 760px){
              padding-bottom: 58px !important;
            }
          `}
          >
            <PageTools.Title>
              <h1
                css={css`
                  `}>
                How to use this quickstart
              </h1>
            </PageTools.Title>
          </div>
        </PageTools.Section>

        <PageTools.Section>
          <ul>
            <li
              css={css`
        ::marker{
          color: #1D252C;
        }
        `}>
              <Link
                css={css`
          color: #1D252C;
          &:hover{
            color: #1D252C;
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
           color: #1D252C;
           &:hover{
            color: #1D252C;
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
         ::marker{
           color: #1D252C;
         }
         `}>Click the green install button above.</li>
            <li
              css={css`
         ::marker{
           color: #1D252C;
         }
         `}>
              Install the quickstart to get started or improve how you monitor
              your environment. They’re filled with pre-built resources like
              dashboards, instrumentation, and alerts.
            </li>
          </ul>
        </PageTools.Section>

        <PageTools.Section>
          <InstallButton quickstart={quickstart}
            location={location}
            css={css`
                            background: #1D252C;
                            padding: 10px;
                          `} />
        </PageTools.Section>
      </div>
    </>
  );
};

QuickstartHowToUse.propTypes = {
  quickstart: quickstart.isRequired
};

export default QuickstartHowToUse;
