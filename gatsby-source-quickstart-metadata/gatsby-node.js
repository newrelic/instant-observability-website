const fetch = require('node-fetch');
const resolveQuickstartSlug = require('../src/utils/resolveQuickstartSlug');
const pluginLogPrefix = `[gatsby-source-quickstart-metadata]`;
const QUICKSTART_NODE_TYPE = `Quickstarts`;
const NERDGRAPH_URL = process.env.NERDGRAPH_URL;
const NEW_RELIC_API_KEY = process.env.NEW_RELIC_API_KEY;

exports.onPreInit = () =>
  console.log(`${pluginLogPrefix} Loaded gatsby-source-quickstart-metadata`);

/**
 * Used to pull down metadata related to each quickstart, so that related resources has enough information
 * to pull the API.
 * This is just a subset of the data used to populate the catalog and details pages
 */
exports.sourceNodes = async ({
  actions,
  createContentDigest,
  createNodeId,
}) => {
  const { createNode } = actions;
  if (!isEnvSetup()) {
    return;
  }

  const data = await fetchQuickstartMetadata();
  if (!data || data.length < 1) {
    console.warn(`${pluginLogPrefix} no quickstarts found`);
    return;
  }

  data.forEach((quickstart) =>
    createNode({
      fullSlug: resolveQuickstartSlug(quickstart.metadata.slug, quickstart.id),
      displayName: quickstart.metadata.displayName,
      keywords: quickstart.metadata.keywords,
      id: createNodeId(`${QUICKSTART_NODE_TYPE}-${quickstart.id}`),
      parent: null,
      children: [],
      internal: {
        type: QUICKSTART_NODE_TYPE,
        content: JSON.stringify(quickstart),
        contentDigest: createContentDigest(quickstart),
      },
    })
  );
};

const isEnvSetup = () => {
  if (!NERDGRAPH_URL) {
    console.warn(
      `${pluginLogPrefix} NERDGRAPH_URL not set, skipping quickstart metadata fetch`
    );
    return false;
  }
  if (!NEW_RELIC_API_KEY) {
    console.warn(
      `${pluginLogPrefix} NEW_RELIC_API_KEY not set, skipping quickstart metadata fetch`
    );
    return false;
  }

  return true;
};

const fetchQuickstartMetadata = async () => {
  const QUICKSTARTS_QUERY = `
    query QuickstartMetadata {
      actor {
        nr1Catalog {
          quickstarts {
            totalCount
            results {
              id
              metadata {
                keywords
                displayName
                slug
              }
            }
          }
        }
      }
    }
`;

  try {
    const resp = await fetch(NERDGRAPH_URL, {
      method: 'POST',
      body: JSON.stringify({
        query: QUICKSTARTS_QUERY,
      }),
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': NEW_RELIC_API_KEY,
      },
    });

    if (!resp.ok) {
      throw Error(
        `Non 200 status code returned from nerdgraph: ${resp.status} ${resp.statusText}`
      );
    }

    const json = await resp.json();

    if (json.errors) {
      throw new Error(`Errors returned from nerdgraph`, json.errors);
    }

    const results = json.data?.actor?.nr1Catalog?.quickstarts?.results ?? [];

    /* eslint-disable-next-line no-console */
    console.log(`${pluginLogPrefix} Found ${results.length} quickstarts`);

    return results;
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(`${pluginLogPrefix} errored while fetching quickstarts`, err);
  }
};
