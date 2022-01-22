const quote = (str) => `"${str}"`;
const resolveQuickstartSlug = require('./src/utils/resolveQuickstartSlug');

module.exports = {
  pathPrefix: `/instant-observability`,
  flags: {
    DEV_SSR: true,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  siteMetadata: {
    title: 'New Relic Developers',
    titleTemplate: '%s | New Relic Developers',
    description:
      'Do more on our platform and make New Relic your own with APIs, SDKs, code snippets, tutorials, and more developer tools.',
    author: 'New Relic',
    repository: 'https://github.com/newrelic/developer-website',
    siteUrl: 'https://developer.newrelic.com',
    branch: 'develop',
  },
  plugins: [
    'gatsby-plugin-sharp',
    {
      resolve: '@newrelic/gatsby-theme-newrelic',
      options: {
        oneTrustID: '77dd4d78-49db-4057-81ea-4bc325d6ecdd',
        forceTrailingSlashes: true,
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
              let tags = node.keywords;
              let title = node.title;

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
              accountId: '10956800',
              trustKey: '1',
              agentID: '30712246',
              licenseKey: 'NRJS-649173eb1a7b28cd6ab',
              applicationID: '30712246',
              beacon: 'staging-bam-cell.nr-data.net',
              errorBeacon: 'staging-bam-cell.nr-data.net',
            },
            staging: {
              instrumentationType: 'proAndSPA',
              accountId: '10956800',
              trustKey: '1',
              agentID: '30712246',
              licenseKey: 'NRJS-649173eb1a7b28cd6ab',
              applicationID: '30712246',
              beacon: 'staging-bam-cell.nr-data.net',
              errorBeacon: 'staging-bam-cell.nr-data.net',
            },
          },
        },
        tessen: {
          tessenVersion: '1.14.0',
          product: 'DEV',
          subproduct: 'TDEV',
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
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'gatsby-starter-default',
        short_name: 'starter',
        start_url: '/',
        background_color: '#663399',
        theme_color: '#663399',
        display: 'minimal-ui',
        icon: 'src/images/favicon.png',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'quickstarts',
        path: `${__dirname}/src/data/quickstarts.json`,
      },
    },
    {
      resolve: 'gatsby-transformer-json',
      options: {
        // If we need to source json files other than the i18n/nav, we should
        // consider making this dynamic. See the docs for ways to do this.
        //
        // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-json
        typeName: 'Quickstarts',
      },
    },
    'gatsby-plugin-mdx',
    'gatsby-plugin-meta-redirect',
    'gatsby-plugin-use-query-params',
    {
      resolve: 'gatsby-plugin-gatsby-cloud',
      options: {
        allPageHeaders: ['Referrer-Policy: no-referrer-when-downgrade'],
      },
    },
  ],
};
