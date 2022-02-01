import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import AnnouncementBanner from '@newrelic/gatsby-theme-newrelic/src/components/AnnouncementBanner';
import DarkModeToggle from '@newrelic/gatsby-theme-newrelic/src/components/DarkModeToggle';
import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import Dropdown from '@newrelic/gatsby-theme-newrelic/src/components/Dropdown';
import NewRelicLogo from '@newrelic/gatsby-theme-newrelic/src/components/NewRelicLogo';
import GlobalNavLink from '@newrelic/gatsby-theme-newrelic/src/components/GlobalNavLink';
import useMedia from 'use-media';
import useThemeTranslation from '@newrelic/gatsby-theme-newrelic/src/hooks/useThemeTranslation';
import { rgba } from 'polished';

const action = css`
  color: var(--secondary-text-color);
  transition: all 0.2s ease-out;

  &:hover {
    color: var(--secondary-text-hover-color);
  }
`;

export const NR_SITES = {
  PLATFORM: 'PLATFORM',
  PRICING: 'PRICING',
  SOLUTIONS: 'SOLUTIONS',
  DOCS: 'DOCS',
  IO: 'IO',
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
  .set(NR_SITES.Solutions, {
    text: 'Solutions',
    href: 'https://newrelic.com/devops',
  })
  .set(NR_SITES.DOCS, {
    text: 'Docs',
    href: 'https://docs.newrelic.com/',
  })
  .set(NR_SITES.IO, {
    text: 'Instant Observability',
    href: 'https://newrelic.com/instant-observability/',
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
      case 'dropdown':
        navList.push(
          <Dropdown.MenuItem key={href} href={href}>
            {text}
          </Dropdown.MenuItem>
        );
        break;
    }
  });
  return navList;
};

// hides searchbar
const CONDENSED_BREAKPOINT = '815px';

// swaps out logo into collapsable nav
const NAV_BREAKPOINT = '770px';

// changes layout for mobile view
const MOBILE_BREAKPOINT = '600px';

const actionIcon = css`
  display: block;
  cursor: pointer;
`;

const GlobalHeader = ({ className, activeSite }) => {
  const { t } = useThemeTranslation();

  const hideLogoText = useMedia({ maxWidth: '350px' });

  return (
    <>
      <AnnouncementBanner />
      <div
        data-swiftype-index={false}
        className={className}
        css={css`
          background-color: var(--color-neutrals-300);
          box-shadow: var(--shadow-2);
          position: sticky;
          top: 0;
          z-index: 80;

          .dark-mode & {
            background-color: var(--color-neutrals-800);
          }
        `}
      >
        <div
          css={css`
            height: var(--global-header-height);
            display: flex;
            justify-content: space-between;
            max-width: var(--site-max-width);
            margin: 0 auto;
            padding: 0 var(--site-content-padding);
          `}
        >
          <nav
            css={css`
              display: flex;
              align-items: center;
              height: 100%;
              overflow: hidden;
              position: relative;

              @media screen and (max-width: 1235px) {
                &::after {
                  content: '';
                  position: absolute;
                  right: 0;
                  height: 100%;
                  width: 2rem;
                  pointer-events: none;
                  background: linear-gradient(
                    to right,
                    ${rgba('#f4f5f5', 0)},
                    var(--color-neutrals-800)
                  );

                  .dark-mode & {
                    background: linear-gradient(
                      to right,
                      ${rgba('#22353c', 0)},
                      var(--color-dark-100)
                    );
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
            <ExternalLink
              href="https://newrelic.com/"
              css={css`
                display: flex;
                align-items: center;
                margin-right: 1rem;

                @media screen and (max-width: ${NAV_BREAKPOINT}) {
                  display: none;
                }
              `}
            >
              <NewRelicLogo
                size="104px"
                css={css`
                  .logo-text {
                    fill: var(--color-neutrals-900);

                    .dark-mode & {
                      fill: var(--color-neutrals-100);
                    }
                  }
                `}
              />
            </ExternalLink>

            <Dropdown
              css={css`
                display: none;

                @media screen and (max-width: ${NAV_BREAKPOINT}) {
                  display: block;
                }
              `}
            >
              <Dropdown.Toggle
                size={Button.SIZE.EXTRA_SMALL}
                variant={Button.VARIANT.LINK}
                chevron={false}
                css={css`
                  padding-left: 0;
                  padding-right: 0;
                `}
              >
                <NewRelicLogo
                  size={hideLogoText ? '24px' : '104px'}
                  css={css`
                    .logo-text {
                      fill: var(--color-neutrals-900);

                      .dark-mode & {
                        fill: var(--color-neutrals-100);
                      }
                    }
                  `}
                  omitText={hideLogoText}
                />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {createNavList('dropdown', activeSite)}
              </Dropdown.Menu>
            </Dropdown>

            <ul
              css={css`
                height: 100%;
                margin: 0;
                padding: 0;
                display: flex;
                list-style-type: none;
                white-space: nowrap;
                overflow-x: auto;
                position: relative;
                -webkit-overflow-scrolling: touch;
                -ms-overflow-style: -ms-autohiding-scrollbar;

                > li {
                  margin: 0;
                  flex: 0 0 auto;
                  > a {
                    --active-color: var(--color-neutrals-400);
                    color: var(--color-neutrals-900);

                    &:hover {
                      color: var(--color-neutrals-900);
                    }
                    .dark-mode & {
                      --active-color: var(--color-neutrals-900);
                      color: var(--color-neutrals-100);
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
              margin-left: 1rem;
              padding: 0;
              display: flex;
              list-style-type: none;
              align-items: center;
              justify-content: flex-end;
              flex: 1;

              > li {
                transition: all 0.2s ease-out;
                color: var(--secondary-text-color);

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
                  font-size: 0.875rem;
                  white-space: nowrap;
                  color: var(--color-brand-500);
                  border-radius: 4px;

                  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                    display: none;
                  }
                `}
              >
                <span>{t('button.login')}</span>
              </Button>
            </li>
            <li
              css={css`
                display: flex;
              `}
            >
              <Button
                as={ExternalLink}
                className={className}
                href="https://newrelic.com/signup"
                size={Button.SIZE.SMALL}
                variant={Button.VARIANT.PRIMARY}
                instrumentation={{
                  component: 'signUp',
                  layoutElement: 'globalHeader',
                }}
                css={css`
                  button {
                    background: var(color-brand-500);
                    border: 1px solid var(color-brand-500);
                    border-radius: 4px;
                  }
                `}
              >
                <span>{t('button.signUp')}</span>
              </Button>
            </li>
            <li>
              <DarkModeToggle
                css={[
                  actionIcon,
                  action,
                  css`
                    margin: 27px 0px 27px 19px;

                    color: var(--color-neutrals-700);
                    .dark-mode & {
                      color: var(--color-neutrals-300);
                    }

                    @media screen and (max-width: 450px) {
                      margin: 0;
                    }
                  `,
                ]}
                size="1.5rem"
              />
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

GlobalHeader.propTypes = {
  className: PropTypes.string,
  activeSite: PropTypes.oneOf(Object.values(NR_SITES)),
};

export default GlobalHeader;
