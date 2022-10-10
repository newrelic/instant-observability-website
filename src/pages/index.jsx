import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

// Styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@components/styles.scss';
import { css } from '@emotion/react';
// Data
import {
  QUICKSTARTS_COLLAPSE_BREAKPOINT,
  TRIPLE_COLUMN_BREAKPOINT,
  DOUBLE_COLUMN_BREAKPOINT,
  SINGLE_COLUMN_BREAKPOINT,
} from '@data/constants';
import { indexSettings } from '@data/slick-settings';
// Hooks
import useSearchAndCategory from '@hooks/useSearchAndCategory';
// Utils
import allFilteredQuickstarts from '@utils/allFilteredQuickstarts';
import getDisplayName from '@utils/getDisplayName';
// Components
import Spinner from '@newrelic/gatsby-theme-newrelic/src/components/Spinner';
import IOBanner from '@components/IOBanner';
import IOSeo from '@components/IOSeo';
import CategoryList from '@components/indexComponents/CategoryList';
import CategoryDropdown from '@components/indexComponents/CategoryDropdown';
import QuickstartGrid from '@components/QuickstartGrid';
import GoToTopButton from '@components/GoToTopButton';
import SliderWrapper from '@components/SliderWrapper';
import GuidedInstallTile from '@components/GuidedInstallTile';

const COLUMN_BREAKPOINT = '1131px';
// used to set the height of the Spinner to reduce layout shift on page load
const TILE_HEIGHT = '362px';

const QuickstartsPage = ({ data, location }) => {
  console.log('mickey/NR-52304')
  const {
    search,
    category,
    setSearch,
    handleParam,
    handleParams,
  } = useSearchAndCategory(location);

  const handleSearchAndCategory = handleParams('category', 'search');

  const isParamPresent = (value) => value !== '' && value !== undefined;

  const {
    featuredQuickstarts,
    filteredQuickstarts,
    mostPopularQuickstarts,
    categoriesWithCount,
  } = allFilteredQuickstarts(data.allQuickstarts.nodes, search, category);

  const [loadComplete, setLoadComplete] = useState(false);

  useEffect(() => {
    setLoadComplete(true);
  }, []);

  const showCarouselSection = !category && !search;
  const showGuidedInstallInGrid = !showCarouselSection;

  return (
    <>
      <IOSeo
        title="Instant Observability"
        location={location}
        type="quickstarts"
      />
      <IOBanner
        handleSearch={handleParam('search')}
        setSearch={setSearch}
        search={search}
      />
      <div
        css={css`
          --sidebar-width: 300px;
          --banner-height: 450px;
          --divider-color: #e4e5e6;
          display: grid;
          grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
          grid-template-areas: 'sidebar main';
          grid-template-rows: 1fr auto;
          grid-gap: 20px;
          min-height: calc(100vh - var(--global-header-height));
          margin: 0 auto;
          padding: var(--banner-height) 0 15vh 0;

          max-width: var(--site-max-width);

          @media screen and (min-width: ${COLUMN_BREAKPOINT}) {
            --banner-height: 394px;
          }

          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            grid-gap: 0;
            grid-template-columns: minmax(0, 1fr);
            grid-template-areas: 'main';
            grid-template-rows: unset;
            padding-bottom: 20px;
          }

          @media screen and (max-width: 359px) {
            padding: calc(var(--banner-height) + 50px) 0 15vh 0;
          }
        `}
      >
        <aside
          data-swiftype-index={false}
          css={css`
            grid-area: sidebar;
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
          <CategoryList
            category={category}
            categoriesWithCount={categoriesWithCount}
            handleSearchAndCategory={handleSearchAndCategory}
            search={search}
            loadComplete={loadComplete}
          />
        </aside>
        <div
          css={css`
            grid-area: main;
            padding: 1.5rem;
          `}
        >
          <CategoryDropdown
            category={category}
            categoriesWithCount={categoriesWithCount}
            handleParam={handleParam}
            loadComplete={loadComplete}
          />
          {showCarouselSection && (
            <>
              {mostPopularQuickstarts.length > 0 && (
                <>
                  <div
                    css={css`
                      --text-color: var(--primary-text-color);
                      font-size: 16px;
                      color: var(--color-neutrals-800);
                      align-text: center;
                      margin: 0 0 13px 0;
                      span {
                      }
                      strong {
                        font-size: 28px;
                        line-height: 36px;
                        letter-spacing: -0.5px;
                        font-weight: 300;
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
                      height: ${TILE_HEIGHT};
                    `}
                  >
                    {!loadComplete && <Spinner />}
                    {loadComplete && (
                      <SliderWrapper
                        indexSettings={indexSettings}
                        quickstarts={mostPopularQuickstarts}
                        category="MostPopularQuickstartClick"
                        showGuidedInstall
                      />
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
                  margin: 75px 0 13px 0;

                  strong {
                    font-size: 28px;
                    line-height: 36px;
                    letter-spacing: -0.5px;
                    font-weight: 300;
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
                  margin-bottom: 75px;
                  height: ${TILE_HEIGHT};
                `}
              >
                {!loadComplete && <Spinner />}
                {loadComplete && (
                  <SliderWrapper
                    indexSettings={indexSettings}
                    quickstarts={featuredQuickstarts}
                    category="FeaturedQuickstartClick"
                  />
                )}
              </div>
            </>
          )}
          <div
            css={css`
              margin: 0px 0 13px 4px;

              padding: 0 0 1.25rem 0;
              font-size: 18px;
              display: flex;
              justify-content: space-between;
              align-text: center;

              span {
                width: 100%;

                /* target inner children of parent span */
                span,
                strong {
                  letter-space: -0.5px;
                  @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                    display: none;
                  }
                }
              }

              strong {
                display: block;
                text-overflow: ellipsis;
                overflow-x: hidden;
                whitespace: nowrap;
                font-weight: 300;
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
              <strong>{search || getDisplayName(category)}</strong>
            </span>
          </div>
          <div
            css={css`
              display: grid;
              grid-gap: 40px 15px;
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
            {showGuidedInstallInGrid && (
              <div
                css={css`
                  display: grid;
                  gap: 16px;
                  grid-template-columns: repeat(1, 1fr);
                `}
              >
                <GuidedInstallTile />
              </div>
            )}

            {/* Add pagination grid if no search term or category selected */}
            <QuickstartGrid
              quickstarts={filteredQuickstarts}
              stepSize={
                isParamPresent(search) || isParamPresent(category)
                  ? filteredQuickstarts.length
                  : 11
              }
            />
          </div>
        </div>
      </div>
      <GoToTopButton scrollDistance={1000} />
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
        id
        name
        title
        slug
        summary
        description
        level
        keywords
        logoSvg {
          ext
          publicURL
        }
        logo {
          childImageSharp {
            gatsbyImageData(
              height: 45
              placeholder: BLURRED
              formats: [AUTO, WEBP]
            )
          }
        }
      }
    }
  }
`;

export default QuickstartsPage;
