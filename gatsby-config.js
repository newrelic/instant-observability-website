module.exports = {
  siteMetadata: {
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "quickstarts",
        path: `${__dirname}/src/data/quickstarts.json`,
      },
    },
    {
      resolve: "gatsby-transformer-json",
      options: {
        // If we need to source json files other than the i18n/nav, we should
        // consider making this dynamic. See the docs for ways to do this.
        //
        // https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-transformer-json
        typeName: "Quickstarts",
      },
    },
    {
      resolve: "gatsby-plugin-gatsby-cloud",
      options: {
        allPageHeaders: ["Referrer-Policy: no-referrer-when-downgrade"],
      },
    },
  ],
};

