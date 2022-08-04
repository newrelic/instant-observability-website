[![Community Project header](https://github.com/newrelic/open-source-office/raw/master/examples/categories/images/Community_Project.png)](https://github.com/newrelic/open-source-office/blob/master/examples/categories/index.md#category-community-project)

# Instant Observability Website

_Dashboards, alerts, and integrations all in one place._
This site hosts the public version of the Instant Observability Marketplace

- [Dependencies](#dependencies)
- [Production build](#production-build)
- [Path prefix](#path-prefix)
- [CI/CD](#cicd)
- [Adding custom meta tags](#adding-custom-meta-tags)
- [Support](#support)
- [Contributing](#contributing)
- [Code of conduct](#code-of-conduct)
- [Issues / enhancement requests](#issues-enhancement-requests)
- [License](#license)
- [Security](#security)

## Dependencies

- Node v16 is used in this project as specified in [.nvmrc](https://github.com/newrelic/instant-observability-website/blob/master/.nvmrc).
- Yarn v1.22

## 👷‍♂️ Local development

You can serve this site locally to quickly see your changes and additions before you PR them. To get started, navigate into your new site’s directory and start it up, as follows.

```shell
cd instant-observability-website/
yarn install
yarn start
```

Your site is now running at `http://localhost:8000`!

## 🚀 Production Build

You can serve this site locally to quickly see your changes and additions before you PR them. To get started, navigate into your new site’s directory and start it up, as follows.

```shell
cd instant-observability-website/
yarn install
yarn build
yarn serve
```

Your site is now running at `http://localhost:9000`!

### Path prefix

This site supports using a path prefix, allowing the site to work as if it was exposed at `www.somewebsite.com/` while actually being exposed at `www.somewebsite.com/instant-observability`. The value of the prefix is defined in the `gatsby-config.js` file under the `pathPrefix` field.

To build to the with the path prefix enabled:

```shell
yarn build:production
```

To then serve the built site with path prefixing enabled:

```shell
yarn serve:production
```

## ✅ CI/CD

### Gatsby Build Service

- Verifies that your branch can be built and generates a preview build.
- This check is required for merges into `main`.

### Fetch-quickstarts

Runs every 4 hours to pull in new quickstarts from Nerdgraph (New Relic's GraphQL instance) and commit them to the `main` branch.

### Fetch related resources content

Runs every day to get various pages that relate to each quickstart from our vendor.

### Clear website cache

Runs on every push to the `main` branch and clears out the `newrelic.com/instant-observability` cache.
This can also be kicked off manually via a workflow run.

## ☁️ Hosting

- This site is built and hosted on [Gatsby Cloud](https://www.gatsbyjs.com/products/cloud/)
- Changes are published on pushes to `main`.

## Adding custom meta tags

Custom meta tags can be added for a quickstart in [quickstart-metadata.json](src/data/quickstart-metadata.json)
To add a new set of meta tags for a quickstart, add the following to the quickstart-metadata.json file.

```
{
  "<quickstart slug>": {
    "title": <title which should be in title meta tag>,
    "description": <description which should be in description meta tag>
  }
}
```

For example, to add a custom meta title and description to a quickstart with the slug cool-qs:

```
{
  "cool-qs": {
    "title": "Cool QS",
    "description": "Cool qs description for SEO purposes"
  }
}
```

### Environment variables

| key                   | possible values               | notes                                                                                                                                                      |
| --------------------- | ----------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `GATSBY_NEWRELIC_ENV` | `development` or `production` | Used by the [New Relic Gatsby Theme](https://github.com/newrelic/gatsby-theme-newrelic) to determine the running environment. Set to `production` on prod. |
| `PREFIX_PATHS`        | `true` or `false`             | Enables path prefixing during builds and deployments. Set to `true` on prod.                                                                               |

## 🩹 Support

New Relic has open-sourced this project. This project is provided AS-IS WITHOUT WARRANTY OR DEDICATED SUPPORT. Issues and contributions should be reported to the project here on GitHub.

We encourage you to bring your experiences and questions to the [Explorers Hub](https://discuss.newrelic.com/t/how-to-install-your-first-quickstart-to-get-instant-observability-in-new-relic-i-o/164280) where our community members collaborate on solutions and new ideas.

## 🚧 Contributing

We welcome contributions to the New Relic I/O Site. Please review our [Contributors Guide](CONTRIBUTING.md) prior to submitting any code.

Keep in mind when you submit your pull request, you'll need to sign the CLA via the click-through using CLA-Assistant. You only have to sign the CLA one time per project. If you have any questions, or to execute our corporate CLA, required if your contribution is on behalf of a company, please drop us an email at opensource@newrelic.com.

## 🚦Code of conduct

Please review and agree to our [Code of Conduct](https://github.com/newrelic/.github/blob/main/CODE_OF_CONDUCT.md) prior to submitting any code.

## 🐛 Issues / enhancement requests

Please submit any issues or enhancement requests using one of our
[Issue Templates](https://github.com/newrelic/instant-observability-website/issues/new/choose).
Please search for and review the existing open issues before submitting a new
issue to prevent the submission of duplicate issues.

## 🖋 License

The Instant Observability Website is licensed under the [Apache 2.0](http://apache.org/licenses/LICENSE-2.0.txt) License.

> The Instant Observability Website also uses source code from third-party libraries. You can find full details on which libraries are used and the terms under which they are licensed in the third-party notices document

## 🔒 Security

As noted in our [security policy](../../security/policy), New Relic is committed to the privacy and security of our customers and their data. We believe that providing coordinated disclosure by security researchers and engaging with the security community are important means to achieve our security goals.

If you believe you have found a security vulnerability in this project or any of New Relic's products or websites, we welcome and greatly appreciate you reporting it to New Relic through [HackerOne](https://hackerone.com/newrelic).
