import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import bannerOverlayRight from '../images/io-banner/banner-style-right.svg';
import bannerOverlayLeft from '../images/io-banner/banner-style-left.svg';
import { SearchInput } from '@newrelic/gatsby-theme-newrelic';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../data/constants';

const BannerHeaderContent = ({ search, setSearch, setIsSearchInputEmpty }) => {
  const handleSearchInput = (e) => {
    let searchInputValue = e.target.value;
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

        width: 568px;
        height: 192px;

        @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          padding: 48px 24px;
        }
      `}
    >
      <h2
        css={css`
          color: var(--color-brand-300);

          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            font-weight: 400;
          }
        `}
      >
        Instant Observability
      </h2>
      <h1
        css={css`
          color: var(--color-neutrals-050);
          font-weight: 600;

          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            font-size: 20px;
          }
        `}
      >
        Monitor everything in your stack
      </h1>
      <div
        css={css`
          background: none;
          color: var(--color-brand-100);

          @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            font-size: 12px;
            font-weight: 300;
          }
        `}
      >
        Our quickstarts bundle everything you need to start monitoring like a
        pro right out of the box.
      </div>
      <div>
        <SearchInput
          size={SearchInput.SIZE.LARGE}
          value={search || ''}
          placeholder="What do you want to monitor?"
          onClear={() => {
            setSearch('');
            setIsSearchInputEmpty(true);
          }}
          onChange={handleSearchInput}
          css={css`
            --svg-color: var(--color-neutrals-700);
            box-shadow: none;
            max-width: 630px;
            line-height: 1;
            margin-top:20px;
            padding-left: 0.5rem;
            
            input {
              font-size: 14px;
              padding: 0.5rem;
              padding-left: 2.25rem;
              padding-right: 3rem;
              background: var(--color-white);
              border: 1px solid var(--color-neutrals-600);
              border-radius: 4px;
              &::placeholder {
                color: var(--color-neutrals-600);
                padding-left: 0.5rem;
              }
            svg {
              width: 15x;
              height: 15px;
            }
            .dark-mode & {
              background-color: var(--tertiary-background-color);
              --svg-color: var(--primary-text-color);
              input {
                background: var(--color-dark-400);
                &::placeholder {
                  color: var(primary-text-color);
                }
              }
            }
            

            @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
              font-size: 17px;
              max-width: 100%;
            }
          `}
        />
      </div>
    </div>
  );
};
const IOBanner = ({ search, setSearch, setIsSearchInputEmpty }) => {
  return (
    <div
      css={css`
        --banner-height: 308px;
        --left-margin: calc(50% - 50vw);

        position: absolute;
        width: 100vw;
        left: var(--left-margin);
        height: var(--banner-height);
        margin: 0 0 0 var(--left-margin);

        background: var(--color-brand-500);
        border: 1px solid var(--color-brand-600);
        box-sizing: border-box;
      `}
    >
      <div
        css={css`
          margin: 60px 0 56px 0;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            margin: 45px 0;
          }
        `}
      >
        <div
          css={css`
            margin-right: auto;

            @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
              display: none;
            }
          `}
        >
          <img
            css={css`
              width: 100%;
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
        />
        <div
          css={css`
            margin-left: auto;

            @media (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
              display: none;
            }
          `}
        >
          <img
            css={css`
              width: 100%;
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
};
export default IOBanner;
