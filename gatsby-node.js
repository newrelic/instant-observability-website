const path = require(`path`);
const externalRedirects = require('./src/data/quickstart-redirects.json');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage, createRedirect } = actions;
  const result = await graphql(`
    query {
      allQuickstarts {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  externalRedirects.forEach(({ from, to }) => {
    createRedirect({
      fromPath: from,
      toPath: to,
      isPermanent: true,
    });
  });

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const { allQuickstarts } = result.data;

  allQuickstarts.edges.forEach(({ node }) => {
    const { id, slug } = node;

    createPage({
      path: path.join(slug, '/'),
      component: path.resolve('./src/templates/QuickstartDetails.js'),
      context: {
        id,
        layout: 'QuickStartLayout',
      },
    });
  });
};

exports.onCreatePage = async ({ page, actions }) => {
  const { createPage, deletePage } = actions;
  const oldPage = { ...page };

  if (page.path === '/') {
    page.context.layout = 'QuickStartLayout';
  }
  deletePage(oldPage);
  createPage(page);
};

exports.onCreateWebpackConfig = ({ actions, plugins, getConfig }) => {
  actions.setWebpackConfig({
    // The `debug` library is causing issues when building the site by including
    // invalid JS. This ensures the module resolves to the browser-capatible
    // source instead of the node source. See the following issue for this
    // recommendation:
    // https://github.com/escaladesports/legacy-gatsby-plugin-prefetch-google-fonts/issues/18
    plugins: [plugins.normalModuleReplacement(/^\.\/node\.js/, './browser.js')],
    externals: {
      tessen: 'Tessen',
    },
    resolve: {
      fallback: {
        http: false,
        https: false,
        zlib: false,
      },
      alias: {
        '@components': path.resolve(__dirname, 'src/components/'),
        '@hooks': path.resolve(__dirname, 'src/hooks/'),
        '@utils': path.resolve(__dirname, 'src/utils/'),
        '@layouts': path.resolve(__dirname, 'src/layouts/'),
        '@data': path.resolve(__dirname, 'src/data/'),
      },
    },
  });
};
