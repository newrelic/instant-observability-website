'use strict';

/**
 * This script is used to query the New Relic GraphQL API for Quickstarts.
 * It then writes the array of Quickstarts to src/data/quickstarts.json
 * It requires the following environment variables to be set:
 * NR_GQL_URL - The New Relic GraphQL URL
 * NR_API_TOKEN - A New Relic personal API token
 **/

/* eslint-disable no-console */
const fs = require('fs');
const fetch = require('node-fetch');
const get = require('lodash.get');

const QUICKSTARTS_FILE_PATH = './src/data/quickstarts.json';
const NR_API_URL = process.env.NR_API_URL;
const NR_API_TOKEN = process.env.NR_API_TOKEN;
const gql = String.raw; // Hack to trick editors into syntax highlighting for graphql without pulling in a package

const nr1CatalogQuickstartQuery = gql`
  query QuickstartFetchQuery {
    actor {
      nr1Catalog {
        quickstarts {
          results {
            featured
            id
            sourceUrl
            supportLevel
            metadata {
              authors {
                name
              }
              categoryTerms
              description
              displayName
              slug
              summary
              keywords
              icon {
                url
              }
              installer {
                type
                ... on Nr1CatalogInstallPlan {
                  steps {
                    description
                    displayName
                    id
                  }
                }
              }
              quickstartComponents {
                ... on Nr1CatalogQuickstartAlertCondition {
                  __typename
                  id
                  metadata {
                    description
                    displayName
                    type
                  }
                }
                ... on Nr1CatalogQuickstartDashboard {
                  __typename
                  id
                  metadata {
                    description
                    displayName
                    previews {
                      url
                      ... on Nr1CatalogPreview {
                        url
                      }
                      ... on Nr1CatalogScreenshot {
                        url
                      }
                    }
                  }
                }
                ... on Nr1CatalogQuickstartDocumentation {
                  __typename
                  metadata {
                    description
                    displayName
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;

/**
 * Queries graphql for the provided query
 * @param {String} queryString the graphql query to send
 * @param {String} url NR graphql endpoint
 * @param {String} token NR api token
 * @returns {Promise<Object[]|undefined>} returns the resulting array
 * or `undefined` if there was an error
 **/
const fetchQuickstarts = async (queryString, url, token) => {
  try {
    const res = await fetch(url, {
      method: 'post',
      body: JSON.stringify({ query: queryString }),
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': token,
      },
    });

    if (!res.ok) {
      throw new Error(`Received status code ${res.status} from the API`);
    }

    const results = await res.json();

    if (results.errors) {
      throw new Error(JSON.stringify(results.errors, null, 2));
    }

    return get(results, 'data.actor.nr1Catalog.quickstarts.results');
  } catch (error) {
    console.error('Encountered a problem querying the graphql api', error);
  }
};

const DASHBOARD_TYPENAME = 'Nr1CatalogQuickstartDashboard';
const ALERT_TYPENAME = 'Nr1CatalogQuickstartAlertCondition';
const DOCUMENTATION_TYPENAME = 'Nr1CatalogQuickstartDocumentation';

const formatQuickstart = (nr1CatQuickstart) => {
  const metadata = nr1CatQuickstart.metadata;
  const formatted = {};

  formatted.title = metadata.displayName ?? '';
  formatted.name = metadata.slug ?? '';
  formatted.description = metadata.description ?? '';
  formatted.packUrl = nr1CatQuickstart.sourceUrl;
  formatted.id = nr1CatQuickstart.id;
  formatted.level = nr1CatQuickstart.supportLevel;
  formatted.logoUrl = metadata.icon.url;
  formatted.summary = metadata.summary ?? '';
  formatted.websiteUrl = null; // not in the nr1Catalog schema
  formatted.keywords = metadata.keywords;

  formatted.authors = metadata.authors.map(({ name }) => name);

  const components = nr1CatQuickstart?.metadata?.quickstartComponents ?? [];

  formatted.dashboards = components
    .filter((c) => c.__typename === DASHBOARD_TYPENAME)
    .map(formatDashboard);

  formatted.alerts = components
    .filter((c) => c.__typename === ALERT_TYPENAME)
    .map(formatAlert);

  formatted.documentation = components
    .filter((c) => c.__typename === DOCUMENTATION_TYPENAME)
    .map(formatDoc);

  const installSteps = metadata?.installer?.steps ?? [];
  formatted.installPlans = installSteps.map(formatInstallPlan);

  return formatted;
};

const formatDashboard = (nr1CatDashboard) => {
  const metadata = nr1CatDashboard.metadata;
  const formatted = {};

  formatted.name = metadata.displayName;
  formatted.description = metadata.description;
  formatted.url = null; // Doesn't exist in nr1Catalog schema
  formatted.screenshots = metadata?.previews?.map(({ url }) => url) ?? [];

  return formatted;
};

const formatDoc = (nr1CatDoc) => {
  const metadata = nr1CatDoc.metadata;
  const formatted = {};

  formatted.name = metadata.displayName;
  formatted.description = metadata.description;
  formatted.url = metadata.url; // Doesn't exist in nr1Catalog schema

  return formatted;
};

const formatAlert = (nr1CatAlert) => {
  const metadata = nr1CatAlert.metadata;
  const formatted = {};

  formatted.name = metadata.displayName;
  formatted.details = metadata.description;
  formatted.type = metadata.type;
  formatted.url = null; // Doesn't exist in nr1Catalog schema

  return formatted;
};

const formatInstallPlan = (nr1CatInstallPlan) => {
  const formatted = {};

  formatted.name = nr1CatInstallPlan.displayName;
  formatted.id = nr1CatInstallPlan.id;

  return formatted;
};

const validateEnvVars = () => {
  if (typeof NR_API_URL !== 'string') {
    throw new Error('NR_GQL_URL environment variable not set, exiting...');
  }

  if (typeof NR_API_TOKEN !== 'string') {
    throw new Error('NR_API_TOKEN environment variable not set, exiting...');
  }
};

/*
 * @param {String} query a graphql query for quickstarts
 * @param {String} url the New Relic API endpoint
 * @param {String} token a New Relic API token
 **/
const main = async (query, url, token) => {
  const results = await fetchQuickstarts(query, url, token);

  if (results) {
    const convertedQuickstarts = results.map(formatQuickstart);
    console.log(`Found ${results.length} quickstarts.`);
    console.log(`Writing ${QUICKSTARTS_FILE_PATH}`);
    fs.writeFileSync(
      QUICKSTARTS_FILE_PATH,
      JSON.stringify(convertedQuickstarts, null, 2)
    );
  } else {
    console.log(
      'No quickstarts were returned from the api, check the logs for errors.'
    );
    if (require.main === module) {
      process.exit(1);
    }
  }
};

if (require.main === module) {
  validateEnvVars();
  main(nr1CatalogQuickstartQuery, NR_API_URL, NR_API_TOKEN);
}

module.exports = main;

/* eslint-enable no-console */
