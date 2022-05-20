import { LOCALS, RESOURCES, SOCIALS } from '../../../data/constants';
import { graphql, useStaticQuery } from 'gatsby';

import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import { Icon } from '@newrelic/gatsby-theme-newrelic';
import Link from '@newrelic/gatsby-theme-newrelic/src/components/Link';
import NewLogo from './NewLogo';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/react';
import useThemeTranslation from '@newrelic/gatsby-theme-newrelic/src//hooks/useThemeTranslation';

const HOME_LINK = 'https://newrelic.com';

const MOBILE_BREAKPOINT = '920px';

const getCurrentYear = () => {
  let currentYear = '';
  const fullYear = new Date().getFullYear().toString();
  currentYear = fullYear.substring(fullYear.length - 2);
  return currentYear;
};

const GlobalFooter = ({ className }) => {
  const { t } = useThemeTranslation();
  const { site, sitePage } = useStaticQuery(graphql`
    query FooterQueryIO {
      site {
        siteMetadata {
          siteUrl
        }
      }
      sitePage(path: { eq: "/terms" }) {
        id
      }
    }
  `);

  // these icons will be hidden on mobile view
  const renderSocialIcons = () => {
    return (
      SOCIALS.map((social) => (
        <ExternalLink
          key={social.title}
          href={social.href}
          css={css`
            @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
              display: none;
            }
          `}
        >
          <Icon
            name={social.title}
            size="24px"
            css={css`
              outline: none;
              stroke-width: 0px;
              color: var(--secondary-text-color);
              fill: var(--secondary-text-color);
            `}
          />
        </ExternalLink>
      ))
    )
  }

  return (
    <footer
      data-swiftype-index={false}
      className={className}
      css={css`
        /* Color variables */
        --background-color: #1d252c;
        --secondary-text-color: #898e91;

        color: var(--secondary-text-color);
        background-color: var(--background-color);

        /* fonts  */
        font-family: Söhne-Buch;
        font-size: 18px;
        line-height: 24px;

        a {
          color: var(--secondary-text-color);
          text-decoration: none;
          text-decoration-thickness: none;
        }

        a:hover {
          color: white;
        }
      `}
    >
      <div>
        <div
          css={css`
            display: grid;
            background: #1d252c;
            justify-content: space-evenly;

            /* Sets up the sizing of the columns */
            grid-template-columns: min-content 192px;
            grid-template-areas:
              'resources socials'
              'logo logo'
              'legal locale';

            @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
              justify-content: start;

              /* Sets single column for mobile view */
              grid-template-columns: auto;
              grid-template-areas:
                'resources'
                'socials'
                'logo'
                'legal'
                'locale';
            }
          `}
        >
          <div
            css={css`
              display: grid;
              justify-content: start;
              margin-top: 104px;

              /* 4 rows set at 1 fraction each */
              grid-template-rows: repeat(4, 1fr);
              grid-auto-flow: column;
              grid-area: resources;

              > a {
                margin-right: 52px;
                margin-bottom: 32px;
              }

              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                margin: 40px 0px 0px 40px;

                justify-content: flex-start;
                grid-template-rows: 1fr;
                grid-auto-flow: row;

                /* Decrease margin of last item for mobile view */
                > a:nth-last-of-type(1) {
                  margin-bottom: 10px;
                }
              }
            `}
          >
            {RESOURCES.map((resource) => (
              <ExternalLink key={resource.title} href={resource.href}>{resource.title}</ExternalLink>
            ))}
          </div>
          <div
            css={css`
              display: grid;
              justify-content: start;
              margin-top: 104px;

              grid-area: socials;

              svg:hover {
                fill: white;
              }

              @media screen and (min-width: calc(${MOBILE_BREAKPOINT} + 1px)) {
                /* Set the same amount of rows and columns to mimic
                 * the resources grid.
                 */
                grid-template-rows: repeat(4, 1fr);
                grid-template-columns: repeat(4, 1fr);

                > span {
                  justify-self: end;
                  grid-column: span 4;
                }

                > a {
                  justify-self: end;
                  margin-left: 24px;
                  margin-right: 0px;

                  /* Shifts the last row to the right by 1 column */
                  /* Change this when adding or removing socials  */
                  :nth-child(3n + 3) {
                    grid-column-start: 2;
                  }
                }
              }

              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                display: grid;
                justify-content: start;
                margin-top: 40px;
                margin-left: 40px;

                grid-template-rows: 1fr max-content;
                grid-auto-flow: column;

                > span {
                  grid-column: span 7;
                  margin-bottom: 2rem;
                }

                > a {
                  margin-right: 24px;
                }
              }
            `}
          >
            <span>Follow us</span>

            {/* hide icons on mobile view and display them on large screens */}
            {renderSocialIcons()}

            {/* display icons on mobile view and hide on large screens */}
            <div
              css={css`
                display: none;
                @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                  padding: 0;
                  row-gap: 2rem;
                  column-gap: 1.5rem;
                  flex-wrap: wrap;
                  flex-direction: row;
                  max-width: 10.5rem;
                  display: flex;
                  margin-bottom: 1rem;
                  justify-content: flex-start;
                }
              `}
            >
              {SOCIALS.map((social) => (
                <ExternalLink key={social.title} href={social.href}>
                  <Icon
                    name={social.title}
                    size="24px"
                    css={css`
                      outline: none;
                      stroke-width: 0px;
                      color: var(--secondary-text-color);
                      fill: var(--secondary-text-color);
                    `}
                  />
                </ExternalLink>
              ))}
            </div>
          </div>
          <div
            css={css`
              grid-area: logo;
              margin: 64px 0px 0px 0px;

              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                margin: 32px 0px 20px 40px;
              }
            `}
          >

            <ExternalLink href={HOME_LINK}>
              <NewLogo />
            </ExternalLink>
          </div>

          <div
            css={css`
              display: flex;
              margin-top: 20px;

              justify-content: flex-start;
              grid-area: legal;

              a {
                font-size: 14px;
                white-space: nowrap;
                margin-right: 52px;
              }

              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                margin-left: 40px;
                flex-direction: column;
                display: grid;
                grid-template-columns: 10rem 10rem;

                a {
                  white-space: nowrap;
                  margin-bottom: 1rem;
                }
              }
            `}
          >
            {sitePage ? (
              <Link to="/terms">{t('footer.terms', 'Terms of Service')}</Link>
            ) : (
              <ExternalLink href="https://newrelic.com/termsandconditions/terms">
                {t('footer.terms', 'Terms of Service')}
              </ExternalLink>
            )}

            <ExternalLink href="https://newrelic.com/termsandconditions/dmca">
              {t('footer.dcmaPolicy', 'DCMA Policy')}
            </ExternalLink>
            <ExternalLink href="https://newrelic.com/termsandconditions/services-notices">
              {t('footer.privacyNotice', 'Privacy Notice')}
            </ExternalLink>
            <ExternalLink href="https://newrelic.com/termsandconditions/cookie-policy">
              {t('footer.cookiePolicy', 'Cookie Policy')}
            </ExternalLink>
            <ExternalLink href="https://newrelic.com/termsandconditions/uk-slavery-act">
              {t('footer.ukSlaveryAct', 'UK Slavery Act')}
            </ExternalLink>
          </div>
          <div
            css={css`
              display: grid;
              justify-items: end;
              align-items: end;

              grid-area: locale;
              grid-template-column: min-content min-content;
              grid-auto-flow: column;

              > a {
                font-size: 14px;
              }

              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                margin-left: 40px;
                justify-content: start;
                display: grid;
                grid-template-columns: 10rem 10rem;
                justify-items: left;
                margin-top: 2rem;

                grid-template-column: 1fr;
                grid-auto-flow: row;

                > a {
                  margin-bottom: 1rem;
                }
              }
            `}
          >
            {LOCALS.map((locale) => (
              <ExternalLink key={locale.title} href={locale.href}>{locale.title}</ExternalLink>
            ))}
          </div>
          <div
            css={css`
              margin-top: 1.25rem;
              font-size: 0.875rem;
              line-height: 1.25rem;
              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                margin-top: 2rem;
                margin-left: 40px;
              }
            `}
          >
            ©2008-{getCurrentYear()} New Relic, Inc. All rights reserved
          </div>
        </div>
      </div>
    </footer>
  );
};

GlobalFooter.propTypes = {
  fileRelativePath: PropTypes.string,
  className: PropTypes.string,
  pageTitle: PropTypes.string,
};

export default GlobalFooter;
