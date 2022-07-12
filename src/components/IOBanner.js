import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import bannerOverlayRight from '../images/io-banner/banner-style-right.svg';
import bannerOverlayLeft from '../images/io-banner/banner-style-left.svg';
import { SearchInput } from '@newrelic/gatsby-theme-newrelic';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '@data/constants';

const BannerHeaderContent = ({
  search,
  setSearch,
  setIsSearchInputEmpty,
  handleSearch,
}) => {
  const handleSearchInput = (e) => {
    const searchInputValue = e.target.value;
    setSearch(searchInputValue);
    searchInputValue.length > 0
      ? setIsSearchInputEmpty(false)
      : setIsSearchInputEmpty(true);
  };

  return (
    <div
      css={css`
        position: static;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;

        width: 1100px;

        @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          justify-content: center;
          width: 100vw;
        }
      `}
    >
      <h1
        css={css`
          color: var(--secondary-text-color-inverted);
          font-weight: 500;
          font-size: 72px;
          letter-spacing: -0.03em;
          margin: 72px 0 0;

          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            font-size: 52px;
            margin-top: 30px;
          }
        `}
      >
        Monitor everything in your stack.
      </h1>
      <div
        css={css`
          background: none;
          color: #f9fafa;
          font-size: 16px;
          letter-spacing: -0.005em;
          margin: 20px 0;
          font-weight: 300;

          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            font-size: 18px;
          }
        `}
      >
        Our quickstarts bundle everything you need to start monitoring like a
        pro right out of the box
      </div>
      <div>
        <SearchInput
          size={SearchInput.SIZE.LARGE}
          value={search || ''}
          placeholder="Search"
          onClear={() => {
            setSearch('');
            handleSearch('');
            setIsSearchInputEmpty(true);
          }}
          onSubmit={(value) => handleSearch(value)}
          onChange={handleSearchInput}
          css={css`
            box-shadow: none;
            max-width: 816px;
            padding-left: 0.5rem;
            margin: 0 auto 40px;
            height: 64px;
            ${search &&
            search.length > 0 &&
            css`
              > svg {
                display: none;
              }
            `};

            input {
              height: 64px;
              font-size: 18px;
              padding: 20px 55px 20px 24px;
              background: var(--system-text-primary-light);
              border: 1px solid #f9fafa;
              border-radius: 4px;
              color: #f9fafa;
              &::placeholder {
                color: var(--accent-text-color);
              }
              &:focus {
                outline: none;
                border: 1px solid #f9fafa;
                box-shadow: 0 0 0 4px rgba(0, 0, 0, 0.1);
              }
            }
            svg {
              left: unset !important;
              right: var(--horizontal-spacing) !important;
              stroke: #f9fafa;
              height: 24px;
              margin-right: 7px;
            }

            @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
              font-size: 17px;
            }
          `}
        />
      </div>
    </div>
  );
};

BannerHeaderContent.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  setIsSearchInputEmpty: PropTypes.func,
  handleSearch: PropTypes.func,
};

const IOBanner = ({
  search,
  setSearch,
  setIsSearchInputEmpty,
  handleSearch,
}) => {
  return (
    <div
      css={css`
        --banner-height: 368px;

        --left-margin: calc(50% - 50vw);

        position: absolute;
        top: var(--global-header-height);
        width: 100vw;
        left: var(--left-margin);
        height: var(--banner-height);
        margin: 0 0 0 var(--left-margin);
        padding: 0 40px;

        background: var(--system-text-primary-light);
        box-sizing: border-box;
        @media (max-width: 1130px) {
          --banner-height: 425px;
        }
        @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          --banner-height: unset;
        }
      `}
    >
      <div
        css={css`
          margin: 0 auto 88px;
          max-width: 1440px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            width: 100%;
            height: unset;
            margin: 0 auto 0px;
          }
        `}
      >
        <div
          css={css`
            margin-right: auto;

            @media (max-width: 1439px) {
              display: none;
            }
          `}
        >
          <img
            css={css`
              position: absolute;
              width: 157.03px;
              height: 148px;
              left: 10px;
              top: 50px;
            `}
            src={bannerOverlayLeft}
            alt="banner-left"
            loading="lazy"
          />
        </div>
        <BannerHeaderContent
          search={search}
          setSearch={setSearch}
          setIsSearchInputEmpty={setIsSearchInputEmpty}
          handleSearch={handleSearch}
        />
        <div
          css={css`
            margin-left: auto;

            @media (max-width: 1439px) {
              display: none;
            }
          `}
        >
          <img
            css={css`
              position: absolute;
              right: 10px;
              top: 36px;
            `}
            src={bannerOverlayRight}
            alt="banner-right"
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
};

IOBanner.propTypes = {
  search: PropTypes.string,
  setSearch: PropTypes.func,
  setIsSearchInputEmpty: PropTypes.func,
  handleSearch: PropTypes.func,
};

export default IOBanner;
