import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql, useStaticQuery, Link } from 'gatsby';
import AnnouncementBanner from '@newrelic/gatsby-theme-newrelic/src/components/AnnouncementBanner';
import DarkModeToggle from '@newrelic/gatsby-theme-newrelic/src/components/DarkModeToggle';
import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import Dropdown from '@newrelic/gatsby-theme-newrelic/src/components/Dropdown';
import NewRelicLogo from '@newrelic/gatsby-theme-newrelic/src/components/NewRelicLogo';
import Icon from '@newrelic/gatsby-theme-newrelic/src/components/Icon';
import GlobalNavLink from '@newrelic/gatsby-theme-newrelic/src/components/GlobalNavLink';
import useMedia from 'use-media';
import { useLocation } from '@reach/router';
import useQueryParams from '@newrelic/gatsby-theme-newrelic/src/hooks/useQueryParams';
import useLocale from '@newrelic/gatsby-theme-newrelic/src/hooks/useLocale';
import useThemeTranslation from '@newrelic/gatsby-theme-newrelic/src/hooks/useThemeTranslation';
import path from 'path';
import { rgba } from 'polished';
import SearchModal from '@newrelic/gatsby-theme-newrelic/src/components/SearchModal';
import { useDebounce } from 'react-use';
import useHasMounted from '@newrelic/gatsby-theme-newrelic/src/hooks/useHasMounted';
import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';
import SplitTextButton from '@newrelic/gatsby-theme-newrelic/src/components/SplitTextButton';

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
    href: 'https://newrelic.com/',
  })
  .set(NR_SITES.DOCS, {
    text: 'Docs',
    href: 'https://docs.newrelic.com/',
  })
  .set(NR_SITES.IO, {
    text: 'Instant Observability',
    href: 'https://newrelic.com/instant-observability',
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

const actionLink = css`
  ${action};

  display: flex;
  align-items: center;
`;

const actionIcon = css`
  display: block;
  cursor: pointer;
`;

const useSearchQuery = () => {
  const { queryParams, setQueryParam } = useQueryParams();
  const searchQueryParam = queryParams.get('q');
  const [searchTerm, setSearchTerm] = useState(searchQueryParam);
  const hasQParam = queryParams.has('q');
  const tessen = useTessen();

  useDebounce(
    () => {
      if (hasQParam) {
        setQueryParam('q', searchTerm);
        if (searchTerm && searchTerm.length > 2) {
          tessen.track({
            eventName: 'swiftypeSearchInput',
            category: 'GlobalSearch',
            name: 'searchInput',
            searchTerm,
          });
        }
      }
    },
    400,
    [searchTerm, setQueryParam, hasQParam]
  );

  useEffect(() => {
    setSearchTerm(searchQueryParam);
  }, [searchQueryParam]);

  return [searchTerm, setSearchTerm];
};

const GlobalHeader = ({ className, activeSite }) => {
  const hasMounted = useHasMounted();
  const location = useLocation();
  const { queryParams, setQueryParam, deleteQueryParam } = useQueryParams();
  const [searchTerm, setSearchTerm] = useSearchQuery();
  const { t } = useThemeTranslation();

  const {
    allLocale: { nodes: locales },
  } = useStaticQuery(graphql`
    query GlobalHeaderQuery2 {
      allLocale(sort: { fields: [isDefault, locale], order: [DESC, ASC] }) {
        nodes {
          locale
          localName
          isDefault
        }
      }
    }
  `);

  const hideLogoText = useMedia({ maxWidth: '350px' });

  const matchLocalePath = new RegExp(
    `^\\/(${locales.map(({ locale }) => locale).join('|')})`
  );

  const locale = useLocale();

  return (
    <>
      <SearchModal
        value={searchTerm}
        onChange={(searchTerm) => setSearchTerm(searchTerm)}
        onClose={() => {
          deleteQueryParam('q');
        }}
        isOpen={hasMounted && queryParams.has('q')}
      />
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
                flex: 1;
                margin: 0rem 1rem;

                @media screen and (max-width: ${CONDENSED_BREAKPOINT}) {
                  flex: unset;
                }
              `}
            >
              <Link
                to="?q="
                onFocus={() => {
                  setQueryParam('q', '');
                }}
                css={css`
                  ${actionLink}
                  > svg {
                    color: var(--color-neutrals-700);
                    .dark-mode & {
                      color: var(--color-neutrals-300);
                    }
                  }

                  @media screen and (max-width: ${CONDENSED_BREAKPOINT}) {
                    display: block;
                  }
                `}
              >
                <Icon css={actionIcon} name="fe-search" size="1.5rem" />
              </Link>
            </li>
            {locales.length > 1 && (
              <li
                css={css`
                  @media screen and (max-width: ${MOBILE_BREAKPOINT}) {
                    display: none;
                  }
                `}
              >
                <Dropdown align="right">
                  <Dropdown.Toggle
                    size={Button.SIZE.SMALL}
                    variant={Button.VARIANT.LINK}
                    css={css`
                      --active-color: none;
                      margin: 0;
                      height: 72px;
                      border-radius: 0px;
                      font-size: 0.75rem;
                      color: var(--color-neutrals-00);
                      background: transparent;

                      .dark-mode & {
                        --active-color: var(--color-dark-100);
                      }

                      &:hover {
                        color: var(--color-neutrals-600);
                        background-color: var(--active-color);
                      }
                    `}
                  >
                    {locale.localName}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {locales.map(({ isDefault, locale, localName }) => (
                      <Dropdown.MenuItem
                        as={Link}
                        key={locale}
                        href={path.join(
                          isDefault ? '' : `/${locale}`,
                          location.pathname.replace(matchLocalePath, '')
                        )}
                      >
                        {localName}
                      </Dropdown.MenuItem>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </li>
            )}

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
                  color: var(--color-brand-400);
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
              <SplitTextButton
                css={css`
                  button {
                    background: var(color-brand-500);
                    border: 1px solid var(color-brand-500);
                    border-radius: 4px;
                  }
                `}
              />
            </li>
            <li>
              <DarkModeToggle
                css={[
                  actionIcon,
                  action,
                  css`
                    margin: 27px 0px 27px 19px;

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
