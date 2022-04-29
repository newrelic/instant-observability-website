import { graphql, useStaticQuery } from 'gatsby';

import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import { Icon } from '@newrelic/gatsby-theme-newrelic';
import Link from '@newrelic/gatsby-theme-newrelic/src/components/Link';
import NewLogo from './NewLogo';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/react';
import useThemeTranslation from '@newrelic/gatsby-theme-newrelic/src//hooks/useThemeTranslation';

const MOBILE_BREAKPOINT = '920px';

const MIDPOINT_BREAKPOINT = '1230px;';

const RESOURCES = [
  {
    title: 'About Us',
    href: 'https://newrelic.com/about',
  },
  {
    title: 'Leadership',
    href: 'https://newrelic.com/about/leadership',
  },
  {
    title: 'Careers',
    href: 'https://newrelic.com/about/culture',
  },
  {
    title: 'Social Impact',
    href: 'https://newrelic.com/social-impact',
  },
  {
    title: 'Newsroom',
    href: 'https://newrelic.com/about/newsroom',
  },
  {
    title: 'Customers',
    href: 'https://newrelic.com/customers',
  },
  {
    title: 'Partner Program',
    href: 'https://newrelic.com/solutions/partners',
  },
  {
    title: 'Investor Relations',
    href: 'https://ir.newrelic.com/investors-home/default.aspx',
  },
  {
    title: 'Suppliers Portal',
    href: 'https://newrelic.com/procurement/suppliers',
  },
  {
    title: 'Security',
    href: 'https://newrelic.com/security',
  },
  {
    title: 'Contact Us',
    href: 'https://newrelic.com/about/contact-us',
  },
];

const SOCIALS = [
  {
    title: 'facebook',
    href: 'http://www.facebook.com/NewRelic',
  },
  {
    title: 'linkedin',
    href: 'https://www.linkedin.com/company/new-relic-inc-',
  },
  {
    title: 'instagram',
    href: 'https://www.instagram.com/newrelic/',
  },
  {
    title: 'youtube',
    href: 'https://www.youtube.com/user/NewRelicInc/featured',
  },
  {
    title: 'github',
    href: 'https://github.com/newrelic',
  },
  {
    title: 'twitch',
    href: 'https://www.twitch.tv/new_relic',
  },
  {
    title: 'twitter',
    href: 'https://twitter.com/newrelic',
  },
];

const LOCALS = [
  {
    title: 'Français',
    href: 'https://newrelic.com/fr',
  },
  {
    title: 'Deutsch',
    href: 'https://newrelic.com/de',
  },
];

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

  return (
    <footer
      data-swiftype-index={false}
      className={className}
      css={css`
        --background-color: #1d252c;
        --secondary-text-color: #898e91;

        font-family: Söhne-Buch;
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        font-feature-settings: 'ss02' on;

        color: var(--secondary-text-color);
        background-color: var(--background-color);

        a {
          color: var(--secondary-text-color);
          text-decoration: none;
          text-decoration-thickness: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}
    >
      <div>
        <div
          css={css`
            display: grid;
            width: 100%;
            grid-template-columns: min-content 192px;
            justify-content: space-evenly;

            grid-template-areas:
              'resources socials'
              'logo logo'
              'legal locale';

            @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
              justify-content: start;

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
              margin: 104px 0px 0px 0px;
              justify-content: start;
              display: grid;
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

                > a:nth-last-child(1) {
                  margin-bottom: 10px;
                }
              }
            `}
          >
            {RESOURCES.map((resource) => (
              <ExternalLink href={resource.href}>{resource.title}</ExternalLink>
            ))}
          </div>
          <div
            css={css`
              display: grid;
              justify-content: start;
              grid-area: socials;

              margin-top: 104px;


              @media screen and (min-width: calc(${MOBILE_BREAKPOINT} + 1px)) {
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
                  :nth-child(3n + 3) {
                    grid-column-start: 2;
                  }
                }
              }

              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                justify-content: start;
                margin: 40px 0px 0px 40px;
                display: grid;
                grid-template-rows: 1fr max-content;
                grid-auto-flow: column;

                > span {
                  grid-column: span 7;
                  margin-bottom: 14px;
                }

                > a {
                  margin-right: 24px;
                }
              }
            `}
          >
            <span>Follow us</span>

            {SOCIALS.map((social) => (
              <ExternalLink href={social.href}>
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
          <div
            css={css`
              grid-area: logo;
              margin: 64px 0px 0px 0px;

              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                margin: 32px 0px 20px 40px;
              }
            `}
          >
            <NewLogo />
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

                a {
                  white-space: nowrap;
                  margin-bottom: 32px;
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

                grid-template-column: 1fr;
                grid-auto-flow: row;

                > a {
                  margin-bottom: 32px;
                }
              }
            `}
          >
            {LOCALS.map((locale) => (
              <ExternalLink href={locale.href}>{locale.title}</ExternalLink>
            ))}
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
