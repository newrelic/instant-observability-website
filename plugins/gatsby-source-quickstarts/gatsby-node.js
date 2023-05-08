const fs = require('fs');
const path = require('path');
const { createRemoteFileNode } = require('gatsby-source-filesystem');
const resolveQuickstartSlug = require('../../src/utils/resolveQuickstartSlug');

const QUICKSTARTS_FILE = '/src/data/quickstarts.json';

/**
 * Array that holds all of the quickstart data from the JSON file.
 * This needs to be defined in the scope of this file so that it can be
 * populated in `onPreInit` and used in `sourceNodes`.
 *
 * @type {Object<string, any>[]}
 */
let QUICKSTARTS = [];

/**
 * Once (and only once) look for the quickstarts.json file. If it exists,
 * load it into the `QUICKSTARTS` variable for use in `sourceNodes`.
 *
 * NOTE: in the future, this could be rewritten to fetch the data from the
 * catalog service, rather than loading a JSON file.
 */
exports.onPreInit = ({ store }) => {
  const { program } = store.getState();
  const quickstartsPath = path.join(program.directory, QUICKSTARTS_FILE);

  // Only load the quickstarts if the file exists.
  if (fs.existsSync(quickstartsPath)) {
    const file = fs.readFileSync(quickstartsPath, { encoding: 'utf8' });
    QUICKSTARTS = JSON.parse(file);
  }
};

/**
 * Rather than inferring the type from the JSON object, we specifically
 * define the types here. This allows us to return different values for
 * some of the fields (in `createResolvers`) and to fetch remote resources
 * as needed (in `sourceNodes`).
 */
exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type Quickstarts implements Node {
      name: String
      title: String
      description: String
      packUrl: String
      summary: String
      keywords: [String]
      authors: [String]
      logoSvg: File
      logo: File
      level: QuickstartSupportLevel
      documentation: [QuickstartDocumentation]
      alerts: [QuickstartAlertCondition]
      dashboards: [QuickstartDashboard]
      installPlans: [QuickstartInstallPlan]
      dataSources: [QuickstartDataSource]
    }

    type QuickstartDocumentation {
      name: String
      description: String
      url: String
    }

    type QuickstartAlertCondition {
      name: String
      details: String
      type: QuickstartAlertConditionType
      url: String
    }

    type QuickstartDashboard implements Node {
      name: String
      description: String
      url: String
      screenshots: [File]
    }

    type QuickstartDataSource {
      name: String
      id: String
    }

    type QuickstartInstallPlan {
      name: String
      id: String
    }

    enum QuickstartSupportLevel {
      COMMUNITY
      ENTERPRISE
      NEW_RELIC
      VERIFIED
    }

    enum QuickstartAlertConditionType {
      BASELINE
      STATIC
    }
  `);
};

/**
 * Custom resolvers for fields that don't exist in the original JSON file.
 */
exports.createResolvers = ({ createResolvers }) => {
  createResolvers({
    Quickstarts: {
      slug: {
        type: 'String',
        resolve: ({ name }) => {
          return resolveQuickstartSlug(name);
        },
      },
    },
  });
};

/**
 * Turn the content from the JSON file into nodes that can be queried with
 * GraphQL. Along the way, this will make requests out to Github's CDN to
 * download all of the related images for use with `<GatsbyImage>` (sharp).
 */
exports.sourceNodes = async ({
  actions: { createNode },
  createNodeId,
  createContentDigest,
  getCache,
}) =>
  Promise.all(
    QUICKSTARTS.map(async (quickstart) => {
      const { name, id, logoUrl } = quickstart;

      let logoNode = null;
      try {
        // if we have a logoUrl, fetch it and create a "File" node
        logoNode = logoUrl
          ? await createRemoteFileNode({
              url: logoUrl,
              parentNodeId: id,
              createNode,
              createNodeId,
              getCache,
              ext: path.extname(logoUrl),
              // grab the file name and remove the extname from the string
              name: path.basename(logoUrl, path.extname(logoUrl)).toLowerCase(),
            })
          : null;
      } catch (e) {
        // catch any errors when fetching image so that build still succeeds
        console.log(`Unable to fetch logo for ${name}: ${logoUrl}`); // eslint-disable-line no-console
      }

      const isLogoSvg = logoNode && logoNode.ext === '.svg';

      // loop over the dashboard(s) for this quickstart, fetch all the
      // screenshot(s) and create "File" nodes for each.
      const dashboards = await Promise.all(
        quickstart.dashboards.map((dashboard) =>
          getDashboardData({
            dashboard,
            parentNodeId: id,
            createNode,
            createNodeId,
            getCache,
          })
        )
      );

      createNode({
        // quickstart fields
        id,
        name,
        packUrl: quickstart.packUrl,
        description: quickstart.description,
        title: quickstart.title,
        level: quickstart.level,
        summary: quickstart.summary,
        keywords: quickstart.keywords,
        authors: quickstart.authors,
        documentation: quickstart.documentation,
        alerts: quickstart.alerts,
        installPlans: quickstart.installPlans,
        dataSources: quickstart.dataSources,
        logo: !isLogoSvg ? logoNode : null,
        logoSvg: isLogoSvg ? logoNode : null,
        dashboards,
        // gatsby fields
        parent: null,
        children: [],
        plugin: 'gatsby-source-quickstarts',
        internal: {
          type: 'Quickstarts',
          contentDigest: createContentDigest({ id, name }),
        },
      });
    })
  );

/**
 * Gets the information for a `QuickstartDashboard` node. This will download
 * all of the dashboard screenshots and turn them into "File" nodes.
 */
const getDashboardData = async ({
  dashboard,
  parentNodeId,
  createNode,
  createNodeId,
  getCache,
}) => {
  const { name, description, url } = dashboard;

  // generate an ID for this dashboard
  // NOTE: this could easily be replaced with a proper ID in the future
  // if dashboards get their own ID.
  const id = createNodeId(`${parentNodeId}-dashboard-${name}`);

  // loop through all the screenshot URLs and create file nodes
  const screenshots = [];

  for (const url of dashboard.screenshots) {
    try {
      const screenshotNode = await createRemoteFileNode({
        url,
        parentNodeId: id,
        createNode,
        createNodeId,
        getCache,
        ext: path.extname(url),
        // grab the file name and remove the extname from the string
        name: path.basename(url, path.extname(url)).toLowerCase(),
      });

      if (screenshotNode) {
        screenshots.push(screenshotNode);
      }
    } catch (e) {
      // catch any errors when fetching image so that build still succeeds
      console.log(`Unable to fetch screenshot for ${name}: ${url}`); // eslint-disable-line no-console
    }
  }

  return {
    id,
    name,
    description,
    url,
    screenshots,
  };
};
