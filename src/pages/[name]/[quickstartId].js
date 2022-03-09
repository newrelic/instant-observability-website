import PropTypes from 'prop-types';
import React from 'react';
import QuickstartDetails from '../../components/QuickstartDetails';

const gql = String.raw; // Hack to get text editors to highlight graphql string without pulling in an external package
const NERDGRAPH_URL = process.env.NERDGRAPH_URL;
const NEW_RELIC_API_KEY = process.env.NEW_RELIC_API_KEY;
const QUICKSTART_QUERY = gql`
  query QuickstartDetailsQuery($quickstartId: ID!) {
    actor {
      nr1Catalog {
        quickstart(id: $quickstartId) {
          featured
          id
          metadata {
            authors {
              name
            }
            categories {
              displayName
              slug
              terms
            }
            categoryTerms
            description
            displayName
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
            keywords
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
            slug
            summary
          }
          sourceUrl
          supportLevel
        }
      }
    }
  }
`;

export const getServerData = async ({ params }) => {
  try {
    const resp = await fetch(NERDGRAPH_URL, {
      method: 'POST',
      body: JSON.stringify({
        query: QUICKSTART_QUERY,
        variables: { quickstartId: params.quickstartId },
      }),
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
      throw new Error(`Errors returned from nerdgraph`, json.errors);
    }
    return {
      props: {
        error: false,
        data: json.data,
        pathname: `${params.name}/${params.id}`,
      },
    };
  } catch (err) {
    /* eslint-disable-next-line no-console */
    console.error(err);

    return {
      props: {
        error: true,
      },
    };
  }
};

const QuickstartDetailsSSR = ({ serverData, location }) => {
  const quickstart = serverData?.data?.actor?.nr1Catalog?.quickstart;
  return (
    <QuickstartDetails
      rawQuickstart={quickstart}
      error={serverData.error}
      location={location}
    />
  );
};

QuickstartDetailsSSR.propTypes = {
  serverData: PropTypes.object.isRequired,
  location: PropTypes.string,
};

export default QuickstartDetailsSSR;

