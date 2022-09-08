import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import AnnouncementBanner from '@newrelic/gatsby-theme-newrelic/src/components/AnnouncementBanner';
import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import GlobalNavLink from '@newrelic/gatsby-theme-newrelic/src/components/GlobalNavLink';
import useMedia from 'use-media';
import useThemeTranslation from '@newrelic/gatsby-theme-newrelic/src/hooks/useThemeTranslation';
import useInstrumentedHandler from '@newrelic/gatsby-theme-newrelic/src/hooks/useInstrumentedHandler';
import usePrevious from '@newrelic/gatsby-theme-newrelic/src/hooks/usePrevious';
import { Menu, X } from 'react-feather';
import { useLocation } from '@reach/router';
import NewLogo from './NewLogo';
import { MARKETING_UTM_CODES } from '@data/constants';

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
              <span>{text}</span>
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

const GlobalHeader = ({ className, activeSite }) => {
  const { t } = useThemeTranslation();
  const hideLogoText = useMedia({ maxWidth: '350px' });
  const location = useLocation();
  const previousLocation = usePrevious(location);
  const hasChangedPage = location.pathname !== previousLocation?.pathname;
  const UserIsInMainPage = location.pathname === '/instant-observability/';
  const showGetStarted = !!UserIsInMainPage;
  const [isOpen, setOpen] = useState(false);
  const [utmCode, setUtmCode] = useState(true);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'visible';
    }
  }, [isOpen]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const utmCodeParam = urlParams.get('utm_medium');

    setUtmCode(utmCodeParam);
  }, [location.search]);

  useEffect(() => {
    if (isOpen && hasChangedPage) {
      setOpen(!isOpen);
    }
  }, [hasChangedPage, setOpen, isOpen]);

  return (
    <>
      <AnnouncementBanner />
      {/* web view - start point */}
      <div
        data-swiftype-index={false}
        className={className}
        css={[
          css`
            top: 0;
            z-index: 80;
            border-bottom: 1px solid #83878b;
            display: none;
            color: var(--header-text-color);
            @media screen and (min-width: ${NAV_BREAKPOINT}) {
              display: block;
              background: var(--website-banner-background-color);
              position: sticky;
            }
            @media screen and (max-width: ${NAV_BREAKPOINT}) {
              display: none;
              position: relative;
            }
          `,
        ]}
      >
        <div
          css={css`
            display: flex;
            align-items: center;
            height: 5.75rem;
            padding: 0 var(--site-content-padding);
            max-width: 78rem;
            justify-content: space-between;

            @media screen and (max-width: ${NAV_BREAKPOINT}) {
              margin: 0 13.5rem;
            }

            @media screen and (min-width: ${NAV_BREAKPOINT}) {
              margin: 0 auto;
              max-width: 1248px;
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
              outline: none;
              ${MARKETING_UTM_CODES.includes(utmCode) &&
              !UserIsInMainPage &&
              `
                pointer-events: none;
                cursor: default;
              `}
              @media screen and (max-width: ${NAV_BREAKPOINT}) {
                width: 7.5rem;
              }

              @media screen and (min-width: ${NAV_BREAKPOINT}) {
                width: 10.625rem;
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
                margin-left: -0.813rem; 
                letter-spacing: -0.005em;
                font-size: 1.125rem;
                > li {
                  margin: 0.3rem 0;
                  padding 2rem 0;
                  flex: 0 0 auto;
                  > a {
                    color: var(--header-text-color);
                    font-weight: 400;
                    font-size: 1.125rem;
                    padding: 2rem 1rem;
                    display: block;
                    &:focus {
                      outline: none;
                      text-decoration-line: underline;
                      outline-width: 0.25rem;
                      text-underline-offset: 0.25rem;
                    }
                    >span {
                      font-size: 100%;
                    &:hover {
                      border-bottom: 1.5px solid var(--header-text-color);
                    }
                  }
                  }
                }

                @media screen and (max-width: ${NAV_BREAKPOINT}) {
                  display: none;
                }
              `}
            >
              {(UserIsInMainPage ||
                (!UserIsInMainPage &&
                  !MARKETING_UTM_CODES.includes(utmCode))) &&
                createNavList('main', activeSite)}
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
              height: 5.75rem;
              line-height: 1.1;
              > li {
                transition: all 0.2s ease-out;
                color: var(--header-text-color);
                > a {
                  font-weight: 400;
                  font-size: 1.125rem;
                  letter-spacing: -0.005em;

                  &:focus {
                    outline: none;
                    text-decoration-line: underline;
                    outline-width: 0.25rem;
                    text-underline-offset: 0.25rem;
                  }
                }
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
                  font-size: 1rem;
                  white-space: nowrap;
                  text-underline-offset: 0.25rem;
                  &:focus {
                    --tw-text-opacity: 1;
                    color: var(--header-text-color);
                  }
                  > span {
                    color: var(--header-text-color);
                    height: 1.375rem;

                    &:hover {
                      border-bottom: 1.5px solid var(--header-text-color);
                    }
                  }
                  @media screen and (max-width: ${NAV_BREAKPOINT}) {
                    display: none;
                  }
                `}
              >
                <span>{t('Log in')}</span>
              </Button>
            </li>
            {showGetStarted && (
              <li
                css={css`
                  display: flex;
                  align-items: right;
                `}
              >
                <Button
                  className="getstarted"
                  as={ExternalLink}
                  size={Button.SIZE.SMALL}
                  variant={Button.VARIANT.LINK}
                  href="https://one.newrelic.com"
                  css={css`
                    font-size: 1rem;
                    white-space: nowrap;
                    text-underline-offset: 0.25rem;
                    &:focus {
                      --tw-text-opacity: 1;
                      color: rgb(28 231 131 / var(--tw-text-opacity));
                    }
                    > span {
                      color: var(--brand-button-primary-accent);
                      height: 1.375rem;
                      &:hover {
                        color: var(--brand-button-primary-accent);
                        border-bottom: 1.5px solid
                          var(--brand-button-primary-accent);
                      }
                    }
                    @media screen and (max-width: ${NAV_BREAKPOINT}) {
                      display: none;
                    }
                  `}
                >
                  <span>{t('Get Started')}</span>
                </Button>
              </li>
            )}
          </ul>
        </div>
      </div>
      {/* web view - end point */}

      {/* small screen (NAV_BREAKPOINT - 1127px) - start point */}

      <div
        css={css`
          display: none;
          position: relative;
          box-shadow: 0 0.25rem 1.875rem rgb(84 86 90 / 10%);
          background: var(--website-banner-background-color);
          border-bottom: 1px solid #83878b;
          @media screen and (max-width: ${NAV_BREAKPOINT}) {
            display: flex;
            z-index: 0;
            height: var(--global-header-height);
          }

          @media screen and (min-width: ${NAV_BREAKPOINT}) {
            z-index: 10;
          }
        `}
      >
        <div
          css={css`
            display: flex;
            width: 100%;
            flex-wrap: wrap;
            justify-content: space-between;
            flex-direction: column;
            @media screen and (max-width: ${NAV_BREAKPOINT}) {
              flex-direction: row;
              padding: 1rem;
            }

            @media screen and (min-width: ${NAV_BREAKPOINT}) {
              flex-direction: row;
              padding: 1.5rem;
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
              height: 100%;
              outline: none;
              ${MARKETING_UTM_CODES.includes(utmCode) &&
              !UserIsInMainPage &&
              `
                pointer-events: none;
                cursor: default;
              `}
              @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                width: 7.5rem;
              }
              @media screen and (min-width: ${MOBILE_BREAKPOINT}) {
                width: 10.625rem;
              }
            `}
          >
            <NewLogo
              size={hideLogoText ? '24px' : '104px'}
              css={css`
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
                color: var(--header-text-color);
                &:focus {
                  width: 2rem;
                  height: 2rem;
                  margin-right: 1rem;
                  padding: 0;
                }

                &:hover {
                  background-color: transparent;
                }

                > svg {
                  width: 32px;
                  height: 32px;
                }
              `}
              title="Toggle menu"
              variant={Button.VARIANT.LINK}
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
            background-color: var(--primary-background-color);
            z-index: 200;

            @media screen and (min-width: 1128px) {
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
                margin: 0;
                padding: 0;
                letter-spacing: -0.005em;
                > li {
                  margin: 0;
                  flex: 0 0 auto;
                  border-bottom: 1px solid #eeefef;
                  height: var(--global-header-height);
                  border-bottom-color: rgb(228 229 230 / var(--tw-border-opacity));
                  border-bottom-width: 1px;
                  --tw-border-opacity: 1;
                  > a {
                    font-weight: 400;
                    font-size: 1.125rem;
                    line-height: 1.75rem;
                    padding: 1rem 2.5rem;
                    text-align: left;
                    &:focus {
                      outline: none;
                      outline-width: 0.25rem;
                      text-underline-offset: 0.25rem;
                    }              

                    > span {
                      color: var(--primary-text-color);
                      &:hover {
                        color: var(--primary-text-color);
                        border-bottom: 1.5px solid var(--primary-text-color);
                      }
                    }
                  }
                }
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
              background-color: rgb(29, 37, 44);
              height: 6.6rem;
              > a {
                height: 3rem;
                &:focus {
                  outline-style: solid;
                  outline-width: 0.125rem;
                  outline-color: rgb(28 231 131 / 0.3);
                }
              }
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
                font-weight: 400;
                font-size: 0.875rem;
                line-height: 1.93;
                margin-left: 0;
                margin-right: 5px;
                text-decoration: none;
                border: 1px solid transparent;
                border-radius: 4px;
                cursor: pointer;
                display: inline-block;
                text-align: center;
                vertical-align: middle;
                white-space: nowrap;
                padding: 0.6rem 1rem;
                border-color: var(--button-text-color);
                background-color: transparent;
                color: var(--button-text-color);
                &:hover {
                  color: var(--button-text-color);
                  background-color: transparent;
                }
                &:focus {
                  --tw-border-opacity: 1;
                  border-color: rgb(249 250 250 / var(--tw-border-opacity));
                  --tw-text-opacity: 1;
                  color: rgb(249 250 250 / var(--tw-text-opacity));
                }
                  
                `}
            >
              <span>{t('Log in')}</span>
            </Button>
            {showGetStarted && (
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
                padding: 0.6rem 1rem;
                transition: background-color 0.3s ease, color 0.3s ease,
                  border-color 0.3s ease;
                font-weight: 400;
                font-size: 0.875rem;
                line-height: 1.93;
                text-decoration: none;
                border: 1px solid transparent;
                border-radius: 4px;
                cursor: pointer;
                display: inline-block;
                text-align: center;
                vertical-align: middle;
                white-space: nowrap;
                background-color: var(--color-white);
                color: rgb(29, 37, 44);
                border-color: var(--color-white);
                margin-left: -4.49px;
                margin-right: 2px;
                &:focus {
                  text-decoration-line: underline;
                  text-underline-offset: 0.25rem;
                }
              &:hover {
                background-color: var(--color-white);
                color: rgb(29, 37, 44);
              }
           > span{
              &:hover {
                border-bottom: 1.5px solid rgb(29, 37, 44);
              }
              `}
              >
                <span>{t('Get Started')}</span>
              </Button>
            )}
          </div>
        </div>
      )}
      {/* small screen (NAV_BREAKPOINT - 1127px) - end point */}
    </>
  );
};

GlobalHeader.propTypes = {
  className: PropTypes.string,
  activeSite: PropTypes.oneOf(Object.values(NR_SITES)),
};

export default GlobalHeader;
