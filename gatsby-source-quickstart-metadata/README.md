# Gatsby Source Quickstart Metadata
A small plugin to source quickstart metadata at build time. That metadata is then used to create [related resources](https://github.com/newrelic/gatsby-theme-newrelic/tree/develop/packages/gatsby-theme-newrelic#relatedresources).
**Note**: If you are seeing warnings from this plugin during development, they can be ignored. It's only required when you want to generate related resources which is run on a cron schedule in [this](https://github.com/newrelic/instant-observability-website/blob/main/.github/workflows/fetch-related-content.yml) workflow.

### Setup
Besides the requirements of the instant-observability site itself, this plugin requires two environment variables to be set.
- `NERDGRAPH_URL`: set to the New Relic Graphql endpoint
- `NEW_RELIC_API_KEY`: set to a New Relic API key

