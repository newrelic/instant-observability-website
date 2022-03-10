import PropTypes from 'prop-types';
import React from 'react';
import QuickstartsPage from '../components/QuickstartsPage';
import customEventTrack from '../utils/customNewRelicEvent';

const gql = String.raw; // Hack to get text editors to highlight graphql string without pulling in an external package
const NERDGRAPH_URL = process.env.NERDGRAPH_URL;
const NEW_RELIC_API_KEY = process.env.NEW_RELIC_API_KEY;

export const getServerData = async ({ query, url }) => {
  const sortParam = query.sort || 'RELEVANCE';
  const searchParam = query.search;
  const categoryParam =
    !query.category || query.category === '' ? [] : query.category.split(',');

  const QUICKSTARTS_QUERY = gql`
    query getQuickstarts(
      $sortBy: Nr1CatalogSearchSortOption
      $query: String
      $categories: [String!]
    ) {
      actor {
        nr1Catalog {
          quickstarts: search(
            sortBy: $sortBy
            filter: { types: QUICKSTART, categories: $categories }
            query: $query
          ) {
            results {
              ... on Nr1CatalogQuickstart {
                id
                supportLevel
                featured
                metadata {
                  summary
                  keywords
                  displayName
                  slug
                  icon {
                    url
                  }
                }
              }
            }
          }
          categoriesWithCounts: search(
            query: $query
            filter: { types: QUICKSTART }
          ) {
            totalCount
            facets {
              categories {
                count
                displayName
              }
            }
          }
          categoriesWithTerms: categories {
            terms
            displayName
            slug
          }
        }
      }
    }
  `;

  const requestBody = JSON.stringify({
    id: 'quickstartsQuery',
    query: QUICKSTARTS_QUERY,
    variables: {
      sortBy: sortParam,
      query: searchParam,
      categories: categoryParam,
    },
  });

  try {
    const resp = await fetch(NERDGRAPH_URL, {
      method: 'POST',
      body: requestBody,
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': NEW_RELIC_API_KEY,
      },
    });

    if (!resp.ok) {
      throw Error(`Non 200 status code returned`, resp.status, resp.statusText);
    }

    const json = await resp.json();

    if (json.errors) {
      console.error(JSON.stringify(json.errors));
      throw new Error(`Errors returned from nerdgraph`, json.errors);
    }

    const results = json.data.actor.nr1Catalog;

    /* eslint-disable-next-line no-console */
    console.log(`Found ${results.quickstarts?.results?.length} quickstarts`);

    customEventTrack('NerdGraphRequest', {
      success: true,
      requestBody,
      sortParam,
      url,
    });

    return {
      props: {
        error: false,
        data: results,
      },
    };
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);

    customEventTrack('NerdGraphRequest', {
      success: false,
      errorMessage: err,
      requestBody,
      sortParam,
      url,
    });

    return {
      props: {
        error: true,
      },
    };
  }
};

const QuickstartsPageSSR = ({ serverData, location }) => {
  return (
    <QuickstartsPage
      errored={serverData.error}
      serverData={serverData.data}
      location={location}
    />
  );
};

QuickstartsPageSSR.propTypes = {
  serverData: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default QuickstartsPageSSR;
