const path = require(`path`);
const resolveQuickstartSlug = require('./src/utils/resolveQuickstartSlug.js');

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      allQuickstarts {
        edges {
          node {
            fields {
              slug
            }
            id
          }
        }
      }
    }
  `);

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  const { allQuickstarts } = result.data;

  allQuickstarts.edges.forEach(({ node }) => {
    const {
      fields: { slug },
      id,
    } = node;

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

exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions;

  if (node.internal.type === 'Quickstarts') {
    createNodeField({
      node,
      name: 'slug',
      value: `${resolveQuickstartSlug(node.name, node.id)}`,
    });
  }
};

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
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
    },
  });
};
