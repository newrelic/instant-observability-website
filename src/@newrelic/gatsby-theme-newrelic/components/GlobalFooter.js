import { graphql, useStaticQuery } from 'gatsby';

import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import { Icon } from '@newrelic/gatsby-theme-newrelic';
import Link from '@newrelic/gatsby-theme-newrelic/src/components/Link';
import NewLogo from './NewLogo';
import PropTypes from 'prop-types';
import React from 'react';
import { css } from '@emotion/react';
import useThemeTranslation from '@newrelic/gatsby-theme-newrelic/src//hooks/useThemeTranslation';

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

{
  /* <Icon name={social.title} />; */
}

const SOCIALS = [
  { title: 'facebook' },
  { title: 'linkedin' },
  { title: 'instagram' },
  { title: 'youtube' },
  { title: 'github' },
  { title: 'twitch' },
  { title: 'twitter' },
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

        width: 100%;
        color: var(--secondary-text-color);
        background-color: var(--background-color);

        a {
          color: currentColor;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }
      `}
    >
      <div>
        <div
          css={css`
            --default-first-column-size: 1024px;
            display: grid;
            grid-template-columns: 1fr max-content;

            grid-template-areas:
              'resources socials'
              'logo logo'
              'legal locale';

            @media screen and (max-width: 930px) {
              grid-template-areas:
                'resources'
                'socials'
                'logo'
                'legal';
            }
          `}
        >
          <div
            css={css`
              margin: 104px;
              margin-bottom: 0px;
              justify-content: start;
              display: grid;
              grid-template-rows: repeat(4, 1fr);
              grid-auto-flow: column;

              grid-area: resources;

              a {
                font-size: 18px;
                line-height: 24px;
                margin-right: 104px;
                margin-bottom: 32px;
              }

              @media screen and (max-width: 930px) {
                margin-left: 40px;
                justify-content: flex-start;
                grid-template-rows: 1fr;
                grid-auto-flow: row;
              }
            `}
          >
            {RESOURCES.map((resource) => (
              <ExternalLink href={resource.href}>{resource.title}</ExternalLink>
            ))}
          </div>

          <div
            css={css`
              margin: 104px 104px 0px 0px;
              margin-bottom: 0px;

              display: grid;
              grid-area: socials;
              grid-template-rows: repeat(4, 1fr);
              grid-template-columns: repeat(4, 1fr);

              > span {
                justify-self: end;
                font-size: 18px;
                grid-column: span 4;
              }

              > svg {
                justify-self: end;
                margin-left: 24px;

                :nth-child(3n+3) {
                  grid-column-start: 2;
                }
              }


            `}
          >
            <span>Follow us</span>

            {SOCIALS.map((social) => (
              <Icon
                name={social.title}
                size="24px"
                css={css`
                  outline: none;
                  stroke-width: 0px;
                  color: #898e91;
                  fill: #898e91;
                `}
              />
            ))}
          </div>
          <div
            css={css`
              grid-area: logo;
              margin: 64px 0px 0px 104px;

              @media screen and (max-width: 930px) {
                margin-left: 40px;
              }
            `}
          >
            <NewLogo />
          </div>

          <div
            css={css`
              display: flex;
              margin-left: 104px;
              margin-top: 40px;

              justify-content: flex-start;
              grid-area: legal;

              a {
                white-space: nowrap;
                margin-right: 52px;
              }

              @media screen and (max-width: 930px) {
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
              display: flex;
              align-items: flex-end;
              margin-right: 104px;

              justify-content: flex-end;
              grid-area: locale;

              a {
                margin-left: 32px;
                white-space: nowrap;
              }

              @media screen and (max-width: 1180px) {
                display: none;
              }
            `}
          >
            <ExternalLink href="https://newrelic/com/de">
              {t('footer.francais', 'Francais')}
            </ExternalLink>
            <ExternalLink href="https://newrelic/com/de">
              {t('footer.deutsch', 'Deutsch')}
            </ExternalLink>
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
