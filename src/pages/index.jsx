import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import React, { useState, useEffect } from 'react';
import IOSeo from '../components/IOSeo';
import { css } from '@emotion/react';
import Overlay from '../components/Overlay';
import QuickstartTile from '../components/QuickstartTile';
import IOBanner from '../components/IOBanner';
import {
  useTessen,
  Button,
  Spinner,
  Icon,
} from '@newrelic/gatsby-theme-newrelic';
import { navigate } from '@reach/router';

import { useDebounce } from 'react-use';
import { sortFeaturedQuickstarts } from '../utils/sortFeaturedQuickstarts';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../data/constants';
import CATEGORIES from '../data/instant-observability-categories';

import SuperTiles from '../components/SuperTiles';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../components/fonts.scss';

const DOUBLE_COLUMN_BREAKPOINT = '1180px';
const TRIPLE_COLUMN_BREAKPOINT = '1350px';
const SINGLE_COLUMN_BREAKPOINT = QUICKSTARTS_COLLAPSE_BREAKPOINT;

/**
 * Determines if one string is a substring of the other, case insensitive
 * @param {String} substring the substring to test against
 * @returns {(Function) => Boolean} Callback function that determines if the argument has the substring
 */
const stringIncludes = (substring) => (fullstring) =>
  fullstring.toLowerCase().includes(substring.toLowerCase());

/**
 * Filters a quickstart based on a provided search term.
 * @param {String} search Search term.
 * @returns {(Function) => Boolean} Callback function to be used by filter.
 */
const filterBySearch = (search) => ({
  title,
  summary,
  description,
  keywords,
}) => {
  if (!search) {
    return true;
  }

  const searchIncludes = stringIncludes(search);
  return (
    searchIncludes(title) ||
    searchIncludes(summary) ||
    searchIncludes(description) ||
    keywords.some(searchIncludes)
  );
};

/**
 * Filters a quickstart based on a category.
 * @param {String} category The category type (e.g. 'featured').
 * @returns {(Function) => Boolean} Callback function to be used by filter.
 */
const filterByCategory = (category) => {
  const { associatedKeywords = [] } =
    CATEGORIES.find(({ value }) => value === category) || {};

  return (quickstart) =>
    !category ||
    (quickstart.keywords &&
      quickstart.keywords.find((k) => associatedKeywords.includes(k)));
};

const QuickstartsPage = ({ data, location }) => {
  const tessen = useTessen();

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const [isCategoriesOverlayOpen, setIsCategoriesOverlayOpen] = useState(false);
  const [isSearchInputEmpty, setIsSearchInputEmpty] = useState(true);
  const [isSelectCategory, setIsSelectCategory] = useState(true);
  // variable to check if the page load completed
  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const categoryParam = params.get('category');

    setSearch(searchParam);
    setCategory(categoryParam || '');
    if (searchParam || categoryParam) {
      tessen.track({
        eventName: 'instantObservability',
        category: 'QuickstartCatalogSearch',
        search: searchParam,
        quickstartCategory: categoryParam,
      });
    }
  }, [location.search, tessen]);

  // mark the value as true, if the page is loaded
  useEffect(() => {
    setLoadComplete(true);
  }, []);

  const closeCategoriesOverlay = () => {
    setIsCategoriesOverlayOpen(false);
  };

  const handleSearch = (value) => {
    if (value !== null && value !== undefined) {
      const params = new URLSearchParams(location.search);
      params.set('search', value);

      navigate(`?${params.toString()}`);
    }
  };

  const handleCategory = (value) => {
    setIsSelectCategory(true);
    if (value !== null && value !== undefined) {
      const params = new URLSearchParams(location.search);
      params.set('category', value);

      navigate(`?${params.toString()}`);
      if (value != '') {
        setIsSelectCategory(false);
      }
    }

    closeCategoriesOverlay();
  };

  useDebounce(
    () => {
      handleSearch(search);
    },
    400,
    [search]
  );

  const quickstarts = data.allQuickstarts.nodes;

  const featuredQuickStarts = quickstarts?.filter((product) =>
    product.keywords.includes('featured')
  );

  const mostPopularQuickStarts = quickstarts?.filter((product) =>
    product.keywords.includes('most popular')
  );

  const alphaSort = quickstarts.sort((a, b) => a.title.localeCompare(b.title));
  //let sortedQuickstarts = sortFeaturedQuickstarts(alphaSort);
  let sortedQuickstarts = alphaSort;

  // Hard-code for moving codestream object to front of sortedQuickstarts array - CM
  if ((!category && !search) || (category === 'featured' && !search)) {
    // uuid is codestream id specifically - CM
    const codestreamIndex = sortedQuickstarts.findIndex(
      ({ id }) => id === '29bd9a4a-1c19-4219-9694-0942f6411ce7'
    );

    if (codestreamIndex > -1) {
      const codestreamObject = sortedQuickstarts[codestreamIndex];
      sortedQuickstarts = [
        codestreamObject,
        ...sortedQuickstarts.slice(0, codestreamIndex),
        ...sortedQuickstarts.slice(codestreamIndex + 1),
      ];
    }
  }

  const filteredQuickstarts = sortedQuickstarts
    .filter(filterBySearch(search))
    .filter(filterByCategory(category));

  const categoriesWithCount = CATEGORIES.map((cat) => ({
    ...cat,
    count: quickstarts
      .filter(filterBySearch(search))
      .filter(filterByCategory(cat.value)).length,
  }));

  /**
   * Finds display name for selected category.
   * @returns {String} Display name for results found.
   */
  const getDisplayName = (defaultName = 'All quickstarts') => {
    const found = CATEGORIES.find((cat) => cat.value === category);

    if (!found.value) return defaultName;

    return found.displayName;
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 4,
    slidesToScroll: 4,
    adaptiveHeight: false,
    adaptiveWidth: true,
    responsive: [
      {
        breakpoint: 1081,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 760,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
      <IOSeo
        title="Instant Observability"
        location={location}
        type="quickstarts"
      />
      <IOBanner
        search={search}
        setSearch={setSearch}
        setIsSearchInputEmpty={setIsSearchInputEmpty}
      />
      <div
        css={css`
          --sidebar-width: 300px;
          --banner-height: 368px;
          --divider-color: #e4e5e6;
          --primary-text-color: #1d252c;
          display: grid;
          grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
          grid-template-areas: 'sidebar main';
          grid-template-rows: 1fr auto;
          grid-gap: 70px;
          min-height: calc(100vh - var(--global-header-height));
          margin: var(--banner-height) auto;

          max-width: var(--site-max-width);

          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin: 500px auto;
            grid-gap: 0;
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: 'main';
            grid-template-rows: unset;
          }
        `}
      >
        <aside
          data-swiftype-index={false}
          css={css`
            grid-area: sidebar;
            height: calc(100vh - var(--global-header-height));
            position: sticky;
            top: var(--global-header-height);
            width: 100%;

            @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
              display: none;
              position: relative;
              overflow: hidden;
              width: 100%;
              height: 100%;
            }
          `}
        >
          <div
            css={css`
              padding: 32px 0 32px 32px;
              height: 100%;
              overflow: auto;

              label {
                font-family: 'Söhne-Buch';
                font-size: 28px;
                font-weight: 400;
                line-height: 36px;
                margin-bottom: 12px;
                letter-spacing: -0.5px;
              }
              @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                position: relative;
              }
            `}
          >
            <FormControl>
              <Label htmlFor="quickstartCategory">Categories</Label>
              {categoriesWithCount.map(({ displayName, value, count }) => (
                <Button
                  type="button"
                  key={value}
                  disabled={count === 0}
                  onClick={() => handleCategory(value)}
                  css={css`
                    padding: 8px 12px;
                    font-family: 'Söhne-Buch';
                    font-size: 18px;
                    font-weight: 400;
                    line-height: 54px;
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    color: var(--primary-text-color);
                    border-radius: 3px;
                    background: ${category === value
                      ? 'var(--divider-color)'
                      : 'none'};
                  `}
                >
                  {`${displayName}`}
                  <span
                    css={css`
                      padding-left: 0.25rem;
                    `}
                  >{`(${count})`}</span>
                </Button>
              ))}
            </FormControl>
          </div>
        </aside>
        <div
          css={css`
            grid-area: main;
            padding: var(--site-content-padding);
          `}
        >
          <div
            css={css`
              display: flex;
              @media screen and (min-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                display: none;
              }
            `}
          >
            <Button
              css={css`
                width: 100%;
                border-radius: 4px;
                border: 1px solid #1d252c;
                color: var(--primary-text-color);
                font-weight: 400;
                font-size: 18px;
                justify-content: flex-start;
                margin: 10px 10px 30px;
                padding: 20px 24px;
                display: flex;
                justify-content: space-between;
              `}
              variant={Button.VARIANT.LINK}
              onClick={() => setIsCategoriesOverlayOpen(true)}
            >
              {getDisplayName('Filter by Category')}
              <Icon
                css={css`
                  color: #1d252c;
                  width: 20px;
                  transform: rotate(-90deg);
                  margin: -4px;
                `}
                name="fe-chevron-left"
                size="120%"
              />
            </Button>
            <Overlay
              isOpen={isCategoriesOverlayOpen}
              onCloseOverlay={closeCategoriesOverlay}
            >
              <div
                css={css`
                  --divider-color: #e4e5e6;

                  border-radius: 5px;
                  position: relative;
                  width: 100%;
                  margin: 30% auto 0;
                  padding: 1rem;
                  background: var(--primary-background-color);
                `}
              >
                <h3
                  css={css`
                    padding: 0.5rem 0 0 0.5rem;
                    font-family: 'Söhne-Buch';
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 36px;
                    margin-bottom: 12px;
                    letter-spacing: -0.5px;
                  `}
                >
                  Category
                </h3>
                <div
                  css={css`
                    max-height: 400px;
                    padding-bottom: 3rem;
                    overflow-y: scroll;
                  `}
                >
                  {categoriesWithCount.map(({ displayName, value, count }) => (
                    <Button
                      type="button"
                      key={value}
                      onClick={() => handleCategory(value)}
                      css={css`
                        width: 100%;
                        display: flex;
                        justify-content: flex-start;
                        color: var(--primary-text-color);
                        border-radius: 3px;
                        padding: 8px 12px;
                        font-family: 'Söhne-Buch';
                        font-size: 18px;
                        font-weight: 400;
                        line-height: 54px;
                        background: ${category === value
                          ? 'var(--divider-color)'
                          : 'none'};
                      `}
                    >
                      {`${displayName} (${count})`}
                    </Button>
                  ))}
                </div>
                <div
                  css={css`
                    background: var(--divider-color);
                    position: absolute;
                    bottom: 0;
                    left: 0;
                    width: 100%;
                    height: 4rem;
                    border-bottom-right-radius: 5px;
                    border-bottom-left-radius: 5px;
                    display: flex;
                    justify-content: flex-end;
                    align-items: center;
                  `}
                >
                  <Button
                    css={css`
                      height: 2rem;
                      margin-right: 1rem;
                      background: #1d252c;
                      &:hover {
                        background: #1d252c;
                      }
                    `}
                    onClick={closeCategoriesOverlay}
                    variant={Button.VARIANT.PRIMARY}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </Overlay>
          </div>

          {isSelectCategory && isSearchInputEmpty && (
            <>
              {mostPopularQuickStarts.length > 0 && (
                <>
                  <div
                    css={css`
                      --text-color: var(--primary-text-color);
                      font-size: 16px;
                      color: var(--color-neutrals-800);
                      align-text: center;
                      span {
                        color: var(--text-color);
                        /* target inner children of parent span */
                        span,
                        strong {
                        }
                      }
                      strong {
                        color: var(--text-color);
                      }
                      @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                        padding: 0 0 0.5rem;
                      }
                    `}
                  >
                    <span>
                      <strong>Most Popular</strong>
                    </span>
                  </div>
                  <div
                    css={css`
                      display: block;
                      grid-gap: 1.25rem;
                      padding: 10px;
                      grid-template-columns: repeat(4, 1fr);
                      grid-auto-rows: 1fr;

                      @media (max-width: ${TRIPLE_COLUMN_BREAKPOINT}) {
                        grid-template-columns: repeat(3, 1fr);
                      }
                      @media (max-width: ${DOUBLE_COLUMN_BREAKPOINT}) {
                        grid-template-columns: repeat(2, 1fr);
                      }
                      @media (max-width: ${SINGLE_COLUMN_BREAKPOINT}) {
                        grid-template-columns: repeat(1, 1fr);
                      }
                    `}
                  >
                    {!loadComplete && <Spinner />}
                    {loadComplete && (
                      <Slider
                        {...settings}
                        css={css`
                          display: flex;
                        `}
                      >
                        <SuperTiles />
                        {mostPopularQuickStarts.map((pack) => (
                          <QuickstartTile
                            key={pack.id}
                            featured={false}
                            css={css`
                              grid-template-rows:
                                var(--tile-image-height) var(--title-row-height)
                                80px auto;
                              min-height: 280px;
                            `}
                            {...pack}
                          />
                        ))}
                      </Slider>
                    )}
                  </div>
                </>
              )}
              <div
                css={css`
                  --text-color: var(--primary-text-color);
                  font-size: 16px;
                  color: var(--color-neutrals-800);
                  align-text: center;
                  span {
                    color: var(--text-color);
                    /* target inner children of parent span */
                    span,
                    strong {
                    }
                  }
                  strong {
                    color: var(--text-color);
                  }
                  @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                    padding: 0 0 0.5rem;
                  }
                `}
              >
                <span>
                  <strong>Featured</strong>
                </span>
              </div>
              <div
                css={css`
                  display: block;
                  padding: 10px;
                  grid-gap: 1.25rem;
                  grid-template-columns: repeat(4, 1fr);
                  grid-auto-rows: 1fr;

                  @media (max-width: ${TRIPLE_COLUMN_BREAKPOINT}) {
                    grid-template-columns: repeat(3, 1fr);
                  }
                  @media (max-width: ${DOUBLE_COLUMN_BREAKPOINT}) {
                    grid-template-columns: repeat(2, 1fr);
                  }
                  @media (max-width: ${SINGLE_COLUMN_BREAKPOINT}) {
                    grid-template-columns: repeat(1, 1fr);
                  }
                `}
              >
                {!loadComplete && <Spinner />}
                {loadComplete && (
                  <Slider {...settings}>
                    {featuredQuickStarts.map((pack) => (
                      <QuickstartTile
                        key={pack.id}
                        featured={false}
                        css={css`
                          grid-template-rows:
                            var(--tile-image-height) var(--title-row-height)
                            80px auto;
                          min-height: 280px;
                        `}
                        {...pack}
                      />
                    ))}
                  </Slider>
                )}
              </div>
            </>
          )}
          <div
            css={css`
              --text-color: var(--primary-text-color);

              padding: 1.25rem 0;
              font-size: 18px;
              color: var(--color-neutrals-800);
              display: flex;
              justify-content: space-between;
              align-text: center;

              span {
                width: 100%;
                color: var(--text-color);

                /* target inner children of parent span */
                span,
                strong {
                  font-family: 'Söhne-Leicht';

                  letter-space: -0.5px;
                  @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                    display: none;
                  }
                }
              }

              strong {
                color: var(--text-color);
                display: block;
                text-overflow: ellipsis;
                overflow-x: hidden;
                whitespace: nowrap;
                font-weight: 100;
                font-size: 28px;
              }

              @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                padding: 0 0 0.5rem;
              }
            `}
          >
            <span>
              Showing {filteredQuickstarts.length} results
              <span> for: </span>
              <strong>{search || getDisplayName()}</strong>
            </span>
          </div>
          <div
            css={css`
              display: grid;
              grid-gap: 1.25rem;
              grid-template-columns: repeat(4, 1fr);
              grid-auto-rows: 1fr;
              @media (max-width: ${TRIPLE_COLUMN_BREAKPOINT}) {
                grid-template-columns: repeat(3, 1fr);
              }

              @media (max-width: ${DOUBLE_COLUMN_BREAKPOINT}) {
                grid-template-columns: repeat(2, 1fr);
              }

              @media (max-width: ${SINGLE_COLUMN_BREAKPOINT}) {
                grid-template-columns: repeat(1, 1fr);
              }
            `}
          >
            {!isSearchInputEmpty && <SuperTiles />}
            {filteredQuickstarts.map((pack) => (
              <QuickstartTile key={pack.id} featured={false} {...pack} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

QuickstartsPage.propTypes = {
  data: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export const pageQuery = graphql`
  query {
    allQuickstarts {
      nodes {
        fields {
          slug
        }
        id
        title
        name
        logoUrl
        packUrl
        level
        keywords
        dashboards {
          description
          name
          screenshots
        }
        alerts {
          details
          name
          type
        }
        documentation {
          name
          url
          description
        }
        authors
        description
        summary
        installPlans {
          id
          name
        }
      }
    }
  }
`;

const Label = ({ children, htmlFor }) => (
  <label
    htmlFor={htmlFor}
    css={css`
      display: block;
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      color: var(--primary-text-color);
    `}
  >
    {children}
  </label>
);

Label.propTypes = {
  children: PropTypes.node,
  htmlFor: PropTypes.string,
};

const FormControl = ({ children }) => (
  <div
    css={css`
      display: flex;
      flex-direction: column;
      align-items: flex-start;
    `}
  >
    {children}
  </div>
);

FormControl.propTypes = {
  children: PropTypes.node,
};

export default QuickstartsPage;
