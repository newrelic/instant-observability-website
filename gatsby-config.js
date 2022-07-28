const quote = (str) => `"${str}"`;
const resolveQuickstartSlug = require('./src/utils/resolveQuickstartSlug');

module.exports = {
  pathPrefix: `/instant-observability`,
  trailingSlash: 'never',
  flags: {
    DEV_SSR: true,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  siteMetadata: {
    title: 'New Relic Instant Observability',
    titleTemplate: '%s | New Relic Instant Observability',
    description:
      'Instant Observability - Dashboards, alerts, and integrations all in one place! Our quickstarts bundle everything you need to start monitoring like a pro right out of the box.',
    author: 'New Relic',
    repository: 'https://github.com/newrelic/instant-observability-website',
    siteUrl: 'https://newrelic.com/instant-observability',
    branch: 'main',
  },
  plugins: [
    'gatsby-plugin-image',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-plugin-webpack-bundle-analyser-v2',
    {
      resolve: '@newrelic/gatsby-theme-newrelic',
      options: {
        oneTrustID: '77dd4d78-49db-4057-81ea-4bc325d6ecdd',
        layout: {
          contentPadding: '2rem',
          maxWidth: '1700px',
          component: require.resolve('./src/layouts'),
          mobileBreakpoint: '760px',
        },
        prism: {
          languages: ['yaml', 'sass', 'scss', 'java'],
        },
        relatedResources: {
          swiftype: {
            resultsPath: `${__dirname}/src/data/related-pages.json`,
            refetch: Boolean(process.env.BUILD_RELATED_CONTENT),
            engineKey: 'Ad9HfGjDw4GRkcmJjUut',
            limit: 5,
            getSlug: ({ node }) => {
              if (node.internal.type === 'Quickstarts') {
                return resolveQuickstartSlug(node.name, node.id);
              }
            },
            getParams: ({ node }) => {
              const tags = node.keywords;
              const title = node.title;

              return {
                q: tags ? tags.map(quote).join(' OR ') : title,
                search_fields: {
                  page: [
                    'tags^10',
                    'quick_start_name^8',
                    'body^5',
                    'title^1.5',
                    '*',
                  ],
                },
                filters: {
                  page: {
                    type: ['docs', 'developer', 'opensource', 'quickstarts'],
                    document_type: [
                      '!views_page_menu',
                      '!term_page_api_menu',
                      '!term_page_landing_page',
                    ],
                  },
                },
              };
            },
            filter: ({ node }) => node.internal.type === 'Quickstarts',
          },
        },
        newrelic: {
          configs: {
            production: {
              instrumentationType: 'proAndSPA',
              accountId: '11554270',
              trustKey: '1',
              agentID: '35094807',
              licenseKey: 'NRJS-a3f5e1047a2965d965f',
              applicationID: '35094807',
              beacon: 'staging-bam-cell.nr-data.net',
              errorBeacon: 'staging-bam-cell.nr-data.net',
            },
            development: {
              instrumentationType: 'proAndSPA',
              accountId: '11554270',
              trustKey: '1',
              agentID: '35094808',
              licenseKey: 'NRJS-a3f5e1047a2965d965f',
              applicationID: '35094808',
              beacon: 'staging-bam-cell.nr-data.net',
              errorBeacon: 'staging-bam-cell.nr-data.net',
            },
          },
        },
        tessen: {
          tessenVersion: '1.14.0',
          product: 'IO',
          subproduct: 'TIO',
          segmentWriteKey: 'Ako0hclX8WGHwl9rm4n5uxLtT4wgEtuU',
          trackPageViews: true,
          pageView: {
            eventName: 'pageView',
            category: 'DocPageView',
            getProperties: ({ location, env }) => ({
              path: location.pathname,
              env: env === 'production' ? 'prod' : env,
            }),
          },
        },
      },
    },
    {
      resolve: 'gatsby-plugin-sass',
      options: {
        implementation: require('sass'),
      },
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'New Relic Instant Observability',
        short_name: 'IO',
        start_url: '/',
        background_color: '#1d252c',
        theme_color: '#1d252c',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    'gatsby-source-quickstarts',
    'gatsby-plugin-mdx', // Not used, but required by the theme
    'gatsby-plugin-use-query-params',
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        headers: {
          '/*': ['Referrer-Policy: no-referrer-when-downgrade'],
        },
      },
    },
  ],
};
