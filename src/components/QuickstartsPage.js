import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import IOSeo from './IOSeo';
import { css } from '@emotion/react';
import Overlay from './Overlay';
import QuickstartTile from './QuickstartTile';
import IOBanner from './IOBanner';
import QuickstartError from './QuickstartError';
import { useTessen, Button } from '@newrelic/gatsby-theme-newrelic';
import { navigate } from 'gatsby';
import { rawQuickstart } from '../types';
import { useDebounce } from 'react-use';
import QuickstartsSidebar from './QuickstartsSidebar';
import CategorySelector from './CategorySelector';
import QuickstartSort from './QuickstartSort';

import {
  QUICKSTARTS_COLLAPSE_BREAKPOINT,
  LISTVIEW_BREAKPOINT,
} from '../data/constants';

import SuperTiles from './SuperTiles';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const DOUBLE_COLUMN_BREAKPOINT = '1180px';
const TRIPLE_COLUMN_BREAKPOINT = '1350px';
const SINGLE_COLUMN_BREAKPOINT = LISTVIEW_BREAKPOINT;

const QuickstartsPage = ({ location, serverData, errored }) => {
  const allCategoriesWithTerms = serverData?.categoriesWithTerms ?? [];
  const categoriesWithCounts =
    serverData?.categoriesWithCounts?.facets?.categories ?? [];
  let quickstarts = serverData?.quickstarts?.results ?? [];
  const totalCount = serverData?.categoriesWithCounts?.totalCount;

  const tessen = useTessen();

  const urlSearchParams = new URLSearchParams(location.search);
  const currentCategory = urlSearchParams.get('category') ?? '';
  const currentSearch = urlSearchParams.get('search') ?? '';
  const [search, setSearch] = useState(currentSearch);
  const [category, setCategory] = useState(currentCategory);

  const [isCategoriesOverlayOpen, setIsCategoriesOverlayOpen] = useState(false);
  const [isSearchInputEmpty, setIsSearchInputEmpty] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const categoryParam = params.get('category');
    const sortParam = params.get('sort');

    if (searchParam || categoryParam || sortParam) {
      tessen.track({
        eventName: 'instantObservability',
        category: 'QuickstartCatalogSearch',
        search: searchParam,
        quickstartCategory: categoryParam,
        sort: sortParam,
      });
    }
  }, [location.search, tessen]);

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

  const handleCategory = (terms) => {
    if (terms !== null && terms !== undefined) {
      const params = new URLSearchParams(location.search);
      params.set('category', terms);
      setCategory(terms.toString());

      navigate(`?${params.toString()}`);
    }

    closeCategoriesOverlay();
  };

  const mergeCategoriesAndCounts = (allTerms, allCounts) => {
    const fullCategories = {};

    allTerms.forEach((category) => {
      fullCategories[category.displayName] = { ...category, count: 0 };
    });

    allCounts.forEach((category) => {
      fullCategories[category.displayName].count = category.count;
    });
    const categoriesArray = [];

    for (const category of Object.keys(fullCategories)) {
      categoriesArray.push(fullCategories[category]);
    }

    return categoriesArray;
  };

  const fullCategories = mergeCategoriesAndCounts(
    allCategoriesWithTerms,
    categoriesWithCounts
  );

  useDebounce(
    () => {
      handleSearch(search);
    },
    400,
    [search]
  );

  const featuredQuickStarts = quickstarts?.filter(
    (product) => product.featured
  );

  const mostPopularQuickStarts = quickstarts?.filter((product) =>
    product.metadata.keywords.includes('most popular')
  );

  // Hard-code for moving codestream object to front of sortedQuickstarts array - CM
  if ((!category && !search) || (category === 'featured' && !search)) {
    // uuid is codestream id specifically - CM
    const codestreamIndex = quickstarts?.findIndex(
      ({ id }) => id === '29bd9a4a-1c19-4219-9694-0942f6411ce7'
    );

    if (codestreamIndex > -1) {
      const codestreamObject = quickstarts[codestreamIndex];
      quickstarts = [
        codestreamObject,
        ...quickstarts?.slice(0, codestreamIndex),
        ...quickstarts?.slice(codestreamIndex + 1),
      ];
    }
  }

  /**
   * Finds display name for selected category.
   * @returns {String} Display name for results found.
   */
  const getDisplayName = (defaultName = 'All quickstarts') => {
    const found = allCategoriesWithTerms.find(
      (cat) => cat.terms.toString() === category
    );

    if (!found) return defaultName;

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
          --banner-height: 308px;
          display: grid;
          grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
          grid-template-areas: 'sidebar main';
          grid-template-rows: 1fr auto;
          grid-gap: 70px;
          min-height: calc(100vh - var(--global-header-height));
          margin: var(--banner-height) auto;
          max-width: var(--site-max-width);

          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            grid-gap: 0;
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas:
              'sidebar'
              'main';
            grid-template-rows: unset;
          }
        `}
      >
        <QuickstartsSidebar
          categoriesWithCount={fullCategories}
          category={category}
          handleCategory={handleCategory}
          totalQuickstartCount={totalCount}
        />
        <div
          css={css`
            grid-area: main;
            padding: var(--site-content-padding);
          `}
        >
          {/* BEGIN MOBILE CATEGORY PICKER */}
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
                border-radius: 2px;
                border: 1px solid var(--border-color);
                color: var(--primary-text-color);
                font-size: 12px;
                justify-content: flex-start;
                margin: 40px 0;
              `}
              variant={Button.VARIANT.LINK}
              onClick={() => setIsCategoriesOverlayOpen(true)}
            >
              {getDisplayName('Filter by Category')}
            </Button>
            <Overlay
              isOpen={isCategoriesOverlayOpen}
              onCloseOverlay={closeCategoriesOverlay}
            >
              <div
                css={css`
                  border-radius: 5px;
                  position: relative;
                  width: 100%;
                  margin: 30% auto 0;
                  padding: 1rem;
                  background: var(--primary-background-color);
                  div {
                    max-height: 400px;
                  }
                `}
              >
                <CategorySelector
                  categoriesWithCount={fullCategories}
                  category={category}
                  handleCategory={handleCategory}
                  totalQuickstartCount={totalCount}
                />
                <div
                  css={css`
                    background: var(--secondary-background-color);
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
          {/* END MOBILE CATEGORY PICKER */}

          {isSearchInputEmpty && (
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
                          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                            display: none;
                          }
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
                      @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                        display: none;
                      }
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
              </div>
            </>
          )}
          <div
            css={css`
              --text-color: var(--primary-text-color);

              padding: 1.25rem 0;
              font-size: 16px;
              color: var(--color-neutrals-800);
              display: flex;
              justify-content: space-between;
              align-text: center;

              span {
                color: var(--text-color);

                /* target inner children of parent span */
                span,
                strong {
                  @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                    display: none;
                  }
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
              Showing {quickstarts?.length} results
              <span> for: </span>
              <strong>{search || getDisplayName()}</strong>
            </span>

            <QuickstartSort
              location={location}
              css={css`
                width: fit-content;
              `}
            />
          </div>
          {errored ? (
            <QuickstartError />
          ) : (
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
              {quickstarts?.map((quickstart) => (
                <QuickstartTile
                  key={quickstart.id}
                  featured={quickstart.featured}
                  {...quickstart}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

QuickstartsPage.propTypes = {
  serverData: PropTypes.shape({
    quickstarts: PropTypes.shape({
      search: PropTypes.shape({
        results: PropTypes.arrayOf(rawQuickstart),
      }),
    }),
    categoriesWithTerms: PropTypes.arrayOf(
      PropTypes.shape({
        displayName: PropTypes.string,
        terms: PropTypes.array,
      })
    ),
    categoriesWithCounts: PropTypes.shape({
      totalCount: PropTypes.number,
      facets: PropTypes.shape({
        categories: PropTypes.arrayOf(
          PropTypes.shape({
            count: PropTypes.number,
            displayName: PropTypes.string,
          })
        ),
      }),
    }),
  }),
  location: PropTypes.object,
  errored: PropTypes.bool,
};

export default QuickstartsPage;
