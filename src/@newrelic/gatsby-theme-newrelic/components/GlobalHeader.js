import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import AnnouncementBanner from '@newrelic/gatsby-theme-newrelic/src/components/AnnouncementBanner';
import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import GlobalNavLink from '@newrelic/gatsby-theme-newrelic/src/components/GlobalNavLink';
import useMedia from 'use-media';
import useThemeTranslation from '@newrelic/gatsby-theme-newrelic/src/hooks/useThemeTranslation';
import { useInstrumentedHandler } from '@newrelic/gatsby-theme-newrelic';
import { Menu, X } from 'react-feather';
import NewLogo from './NewLogo';

const action = css`
  color: var(--secondary-text-color);
  transition: all 0.2s ease-out;
`;

export const NR_SITES = {
  PLATFORM: 'PLATFORM',
  PRICING: 'PRICING',
  SOLUTIONS: 'SOLUTIONS',
  DOCS: 'DOCS',
  HELP_CENTER: 'HELP CENTER',
};

const HEADER_LINKS = new Map();

HEADER_LINKS.set(NR_SITES.PLATFORM, {
  text: 'Platform',
  href: 'https://newrelic.com/platform',
})
  .set(NR_SITES.PRICING, {
    text: 'Pricing',
    href: 'https://newrelic.com/pricing',
  })
  .set(NR_SITES.SOLUTIONS, {
    text: 'Solutions',
    href: 'https://newrelic.com/devops',
  })
  .set(NR_SITES.DOCS, {
    text: 'Docs',
    href: 'https://docs.newrelic.com/',
  })
  .set(NR_SITES.HELP_CENTER, {
    text: 'Help Center',
    href: 'https://discuss.newrelic.com/',
  });

const createNavList = (listType, activeSite = null) => {
  const navList = [];
  HEADER_LINKS.forEach(({ text, href }) => {
    switch (listType) {
      case 'main':
        navList.push(
          <li key={href}>
            <GlobalNavLink
              href={href}
              activeSite={activeSite && HEADER_LINKS.get(activeSite)}
            >
              {text}
            </GlobalNavLink>
          </li>
        );
        break;
    }
  });
  return navList;
};

// hides searchbar
const CONDENSED_BREAKPOINT = '815px';

// swaps out logo into collapsable nav
const NAV_BREAKPOINT = '1127px';

// changes layout for mobile view
const MOBILE_BREAKPOINT = '600px';

const actionIcon = css`
  display: block;
  cursor: pointer;
`;

const GlobalHeader = ({ className, activeSite }) => {
  const { t } = useThemeTranslation();
  const [isOpen, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  }, [isOpen]);

  const hideLogoText = useMedia({ maxWidth: '350px' });

  return (
    <>
      <AnnouncementBanner />
      <div
        data-swiftype-index={false}
        className={className}
        css={[
          css`
            position: relative;
            top: 0;
            z-index: 80;
            border-bottom: 1px solid #83878b;
            display: none;
            @media screen and (min-width: ${NAV_BREAKPOINT}) {
              display: block;
              background: #1d252c;
            }
          `,
        ]}
      >
        <div
          css={css`
            height: var(--global-header-height);
            display: flex;
            margin: 0 auto;
            max-width: 1440px;
            justify-content: space-between;
            padding: 0 var(--site-content-padding);
            height: 96px;
            align-items: center;
          `}
        >
          <a
            href="https://newrelic.com"
            onClick={useInstrumentedHandler(null, {
              eventName: 'externalLinkClick',
              category: 'LinkClick',
              origin: 'globalHeader',
              href: 'https://newrelic.com',
            })}
            css={css`
              display: flex;
              align-items: center;

              @media screen and (max-width: ${NAV_BREAKPOINT}) {
                display: none;
              }
            `}
          >
            <NewLogo
              size="160px"
              css={css`
                .logo-text {
                  fill: var(--color-neutrals-900);
                }
              `}
            />
          </a>
          <nav
            css={css`
              display: flex;
              align-items: center;
              height: 100%;
              overflow: hidden;
              position: relative;
              width: 100%;
              justify-content: center;

              @media screen and (max-width: 1235px) {
                &::after {
                  content: '';
                  position: absolute;
                  right: 0;
                  height: 100%;
                  width: 2rem;
                  pointer-events: none;
                  }
                }
              }

              @media screen and (max-width: ${NAV_BREAKPOINT}) {
                overflow: visible;

                &::after {
                  background: none !important;
                  width: 0 !important;
                }
              }
            `}
          >
            <ul
              css={css`
                height: 100%;
                display: flex;
                justify-conten: center;
                padding: 0;
                list-style-type: none;
                white-space: nowrap;
                overflow-x: auto;
                position: relative;
                -webkit-overflow-scrolling: touch;
                -ms-overflow-style: -ms-autohiding-scrollbar;
                > li {
                  margin: 1.5rem 0;
                  padding: 0px 32px;
                  flex: 0 0 auto;
                  > a {
                    --active-color: #1d252c;
                    color: #e4e5e6;
                    font-family: Söhne-Buch;
                    font-weight: 400;
                    font-size: 18px;
                    padding: 17px 0px;
                    display: block;
                    &:hover {
                      color: #e4e5e6;
                      border-bottom: 1.5px solid #e4e5e6;
                    }
                  }
                }

                @media screen and (max-width: ${NAV_BREAKPOINT}) {
                  display: none;
                }
              `}
            >
              {createNavList('main', activeSite)}
            </ul>
          </nav>

          <ul
            css={css`
              margin: 0;
              padding: 0;
              display: flex;
              list-style-type: none;
              align-items: center;
              justify-content: flex-end;
              flex: 1;

              > li {
                transition: all 0.2s ease-out;
                color: var(--secondary-text-color);
                > a {
                  font-family: Söhne-Buch;
                  font-weight: 400;
                  font-size: 18px;
                  line-height: 1.625;
                }

                &:not(:first-of-type) {
                  margin-left: 0.5rem;
                }
              }

              @media screen and (max-width: ${CONDENSED_BREAKPOINT}) {
                flex: unset;
              }
            `}
          >
            <li
              css={css`
                display: flex;
                align-items: right;
              `}
            >
              <Button
                as={ExternalLink}
                size={Button.SIZE.SMALL}
                variant={Button.VARIANT.LINK}
                href="https://one.newrelic.com"
                css={css`
                  margin: 0 0.625rem;
                  font-weight: 600;
                  font-size: 18px;
                  white-space: nowrap;
                  color: #e4e5e6;

                  &:hover {
                    color: #e4e5e6;
                  }
                  @media screen and (max-width: ${NAV_BREAKPOINT}) {
                    display: none;
                  }
                `}
              >
                <span>{t('Login')}</span>
              </Button>
            </li>
            <li
              css={css`
                display: flex;
                align-items: right;
              `}
            >
              <Button
                as={ExternalLink}
                size={Button.SIZE.SMALL}
                variant={Button.VARIANT.LINK}
                href="https://one.newrelic.com"
                css={css`
                  font-weight: 600;
                  font-size: 18px;
                  white-space: nowrap;
                  color: #1ce783;
                  &:hover {
                    color: #1ce783;
                  }
                  @media screen and (max-width: ${NAV_BREAKPOINT}) {
                    display: none;
                  }
                `}
              >
                <span>{t('Get Started')}</span>
              </Button>
            </li>
          </ul>
        </div>
      </div>

      <div
        css={css`
          display: none;
          position: relative;
          z-index: 10;
          box-shadow: 0 0.25rem 1.875rem rgb(84 86 90 / 10%);
          background: #1d252c;
          border-bottom: 1px solid #83878b;
          @media screen and (max-width: ${NAV_BREAKPOINT}) {
            display: flex;
          }
          ${isOpen &&
          `
          background: #1D252C;
          `}
        `}
      >
        <div
          css={css`
            display: flex;
            width: 100%;
            padding: 1.5rem;
            flex-wrap: wrap;
            justify-content: space-between;
            flex-direction: column;
            @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
              flex-direction: row;
            }
          `}
        >
          <a
            href="https://newrelic.com"
            onClick={useInstrumentedHandler(null, {
              eventName: 'externalLinkClick',
              category: 'LinkClick',
              origin: 'globalHeader',
              href: 'https://newrelic.com',
            })}
            css={css`
              display: flex;
              align-items: center;
              margin-right: 3rem;
              height: 100%;
            `}
          >
            <NewLogo
              size={hideLogoText ? '24px' : '104px'}
              css={css`
                width: 7.5rem;
                .logo-text {
                  fill: var(--color-neutrals-900);
                }
              `}
              omitText={hideLogoText}
            />
          </a>
        </div>
        <div
          css={css`
            display: grid;
            grid-auto-flow: column;
            align-items: center;
            flex-wrap: wrap;
            justify-content: space-between;
          `}
        >
          <div>
            <Button
              css={css`
                display: flex;
                justify-content: center;
                align-items: center;
                background: transparent;
                border: none;
                cursor: pointer;
                width: 48;
                height: 48;

                ${isOpen
                  ? `
                  color: #E4E5E6;
                  `
                  : `
                  color: #E4E5E6;
                  `}
              `}
              title="Toggle menu"
              onClick={() => setOpen(!isOpen)}
            >
              {isOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div
          css={css`
            display: block;
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: var(--color-white);
            z-index: 1;

            @media screen and (min-width: ${NAV_BREAKPOINT}) {
              display: none;
            }
          `}
        >
          <nav>
            <ul
              css={css`
                display: flex;
                align-items: stretch;
                width: 100%;
                flex-wrap: wrap;
                justify-content: center;
                flex-direction: column;
                list-style-type: none;
                width: 100%;
                margin: 0;
                padding: 0;
                > li {
                  margin: 0;
                  flex: 0 0 auto;
                  border-bottom: 1px solid #eeefef;
                  > a {
                    --active-color: var(--color-white);
                    font-family: Söhne-Buch;
                    color: #54565a;
                    font-weight: 400;
                    font-size: 1rem;
                    line-height: 4;
                    padding: 0 2.5rem;
                    text-align: left;
                @media screen and (min-width: ${NAV_BREAKPOINT}) {
                  flex-direction: row;
                }
                --list style--
                list-style: none;
              `}
            >
              {createNavList('main', activeSite)}
            </ul>
          </nav>
          <div
            css={css`
              display: grid;
              grid-template-columns: 1fr 1fr;
              grid-column-gap: 1.5rem;
              padding: 1.6875rem;
              width: -webkit-fill-available;
              bottom: 0;
              position: fixed;
              box-shadow: 0 0.25rem 1.875rem rgb(84 86 90 / 10%);
            `}
          >
            <Button
              as={ExternalLink}
              size={Button.SIZE.SMALL}
              variant={Button.VARIANT.LINK}
              href="https://one.newrelic.com"
              css={css`
                ease;
                transition: background-color 0.3s ease,color 0.3s ease,border-color 0.3s ease;
                font-family:Söhne-Buch;
                font-weight: 400;
                font-size: 1rem;
                line-height: 1.625;
                text-decoration: none;
                border: 1px solid transparent;
                border-radius: 4px;
                cursor: pointer;
                display: inline-block;
                text-align: center;
                vertical-align: middle;
                white-space: nowrap;
                background-color: #fff;
                color: #1D252C;
                border-color:#1D252C;
                padding: 0.375rem 1rem;
                  
                `}
            >
              <span>{t('Login')}</span>
            </Button>

            <Button
              as={ExternalLink}
              className={className}
              href="https://newrelic.com/signup"
              size={Button.SIZE.SMALL}
              variant={Button.VARIANT.PRIMARY}
              instrumentation={{
                component: 'SignupButton',
                layoutElement: 'globalHeader',
              }}
              css={css`
                padding: 0.375rem 1rem;
                transition: background-color 0.3s ease, color 0.3s ease,
                  border-color 0.3s ease;
                font-family: Söhne-Buch;
                font-weight: 400;
                font-size: 1rem;
                line-height: 1.625;
                text-decoration: none;
                border: 1px solid transparent;
                border-radius: 4px;
                cursor: pointer;
                display: inline-block;
                text-align: center;
                vertical-align: middle;
                white-space: nowrap;
                background-color: #1D252C;
                color: #fff;
                border-color:#1D252C;
              `}
            >
              <span>{t('Get Started')}</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

GlobalHeader.propTypes = {
  className: PropTypes.string,
  activeSite: PropTypes.oneOf(Object.values(NR_SITES)),
};

export default GlobalHeader;
