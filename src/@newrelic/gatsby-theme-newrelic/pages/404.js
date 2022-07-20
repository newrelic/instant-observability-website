import React, { useEffect, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';

import {
  useTessen,
  Button,
  CreateIssueButton,
  Tag,
  Link,
} from '@newrelic/gatsby-theme-newrelic';

import QuickstartLayout from '../../../layouts/QuickStartLayout';

const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

const NotFoundPage = ({ location, pageContext: { swiftypeEngineKey } }) => {
  const [searchTerm, setSearchTerm] = useState(null);
  const [searchResult, setSearchResult] = useState(null);
  const tessen = useTessen();

  const getSearchResults = useCallback(async () => {
    let trimmedResults = null;
    if (searchTerm !== null) {
      const results = await search(searchTerm, swiftypeEngineKey);
      trimmedResults = results.map((r) => {
        return { url: r.url, title: r.title, type: r.type };
      });
    }
    setSearchResult(trimmedResults);
  }, [searchTerm, swiftypeEngineKey]);

  useEffect(() => {
    setSearchTerm(
      location.pathname
        .split('/')
        .filter((p) => p !== 'instant-observability')
        .filter((p) => !uuidRegex.test(p))
        .join(' ')
    );
  }, [location.pathname]);

  useEffect(() => {
    getSearchResults();
  }, [getSearchResults, searchTerm]);

  useEffect(() => {
    if (searchResult) {
      tessen.track({
        eventName: 'error404',
        category: 'ErrorPage',
        path: location.pathname,
        resultCount: searchResult.length,
        searchTerm,
      });
    }
  }, [location.pathname, searchResult, searchTerm, tessen]);

  return (
    <QuickstartLayout>
      <div
        css={css`
          display: grid;
          grid-template-columns: 1fr 1fr 1fr 1fr;
          grid-template-rows: auto;
          grid-template-areas:
            '. . . .'
            '. content content .'
            'footer footer footer footer';
          min-height: calc(100vh - var(--global-header-height));
          max-height: calc(100vh - var(--global-header-height));
        `}
      >
        <div
          css={css`
            display: flex;
            grid-area: content;
            justify-self: start;
          `}
        >
          <div
            css={css`
              font-size: 0.85rem;
            `}
          >
            <h1
              css={css`
                font-weight: normal;
                line-height: 1;
              `}
            >
              Hmm... We can't find this
            </h1>
            <div
              css={css`
                > * {
                  margin-top: 3em;
                }
              `}
            >
              {displaySearchResults(searchTerm, searchResult)}
              <p>
                Find more in the{' '}
                <Link to="/">Instant Observability catalogue</Link> or{' '}
                <CreateIssueButton
                  pageTitle="404"
                  variant={Button.VARIANT.OUTLINE}
                  size={Button.SIZE.SMALL}
                  labels={['bug', '404']}
                  instrumentation={{ component: '404Page' }}
                />
              </p>
            </div>
          </div>
        </div>
      </div>
    </QuickstartLayout>
  );
};

NotFoundPage.propTypes = {
  location: PropTypes.shape({
    href: PropTypes.string.isRequired,
    origin: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  pageContext: PropTypes.shape({
    themeOptions: PropTypes.object.isRequired,
    swiftypeEngineKey: PropTypes.string.isRequired,
  }).isRequired,
};

const displaySearchResults = (term, results) => {
  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div id="search-results">
      Were you looking for any of these?
      <ul
        css={css`
          list-style-type: none;
          padding: 0;
          line-height: 1.75rem;
          margin: 1rem 0 0;
        `}
      >
        {results.map((result, index) => {
          return (
            <li key={`result-${index}`}>
              <div>
                <Link
                  to={result.url}
                  css={css`
                    text-decoration: none;
                  `}
                  instrumentation={{
                    component: '404SuggestedLink',
                    href: result.url,
                    term,
                  }}
                  displayExternalIcon
                >
                  {result.title}
                </Link>
              </div>
              <Tag
                css={css`
                  font-size: 0.625rem;
                  margin-right: 0.5em;
                `}
                uppercase
              >
                {result.type?.replace('_', ' ')}
              </Tag>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

displaySearchResults.propTypes = {
  term: PropTypes.string.isRequired,
  results: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      type: PropTypes.string,
    })
  ),
};

const search = async (searchTerm, token) => {
  try {
    const res = await fetch(
      'https://search-api.swiftype.com/api/v1/public/engines/search.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: searchTerm,
          engine_key: token,
          per_page: 5,
          filters: {
            page: {
              type: [`docs`, `developers`, `opensource`, `quickstarts`],
              document_type: [
                '!views_page_menu',
                '!term_page_api_menu',
                '!term_page_landing_page',
              ],
            },
          },
        }),
      }
    );

    if (!res.ok) {
      throw new Error(
        `Could not fetch related pages. ${res.status} ${res.statusText}`
      );
    }

    const { records } = await res.json();

    return records.page;
  } catch (err) {
    console.error(err);

    return [];
  }
};

export default NotFoundPage;
