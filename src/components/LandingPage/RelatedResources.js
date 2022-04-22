import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql, useStaticQuery } from 'gatsby';
import { PageTools, Tag, Icon, Link } from '@newrelic/gatsby-theme-newrelic';
import useThemeTranslation from '@newrelic/gatsby-theme-newrelic/src/hooks/useThemeTranslation';
import { useLocation } from '@reach/router';

const isRelative = (url) => url.startsWith('/');

const findLabel = (url, labels) => {
  const { label } = labels.find(({ baseUrl }) => url.startsWith(baseUrl)) || {};
  return label;
};

const RelatedResources = ({ className, resources, title }) => {
  const { t } = useThemeTranslation();
  const location = useLocation();
  const {
    site: {
      siteMetadata: { siteUrl },
    },
    newRelicThemeConfig: {
      relatedResources: { labels },
    },
  } = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          siteUrl
        }
      }
      newRelicThemeConfig {
        relatedResources {
          labels {
            baseUrl
            label
          }
        }
      }
    }
  `);

  if (resources.length === 0) {
    return null;
  }

  const currentSiteLabel = (url) => {
    // this can be simplified once we have a subdomain for IO
    if (url.startsWith('/instant-observability')) {
      return 'quickstarts';
    }
    return findLabel(siteUrl, labels);
  };

  return (
    <PageTools.Section className={className}>
      <nav>
        <ul
          css={css`
            list-style: none;
            margin: 0;
            padding: 0;
          `}
        >
          {resources.map(({ url, title }) => {
            if (url.startsWith(siteUrl)) {
              url = url.replace(siteUrl, '');
            }

            const label = isRelative(url)
              ? currentSiteLabel(url)
              : findLabel(url, labels);

            return (
              <li
                key={url}
                css={css`
                  font-size: 0.875rem;
                  margin-top: 0;


                  &:not(:last-child) {
                    margin-bottom: 0.75rem;
                  }
                `}
              >
                <Link
                  to={url}
                  css={css`
                    display: block;
                    margin-bottom: 0.25rem;
                    color: #1D252C;
                    &:hover{
                      color: #1D252C;
                    }
                  `}
                  instrumentation={{
                    navInteractionType: 'relatedResourcesLinkClick',
                    currentUrl: location.pathname,
                  }}
                >
                  {title}

                  {!isRelative(url) && (
                    <Icon
                      name="fe-external-link"
                      css={css`
                        margin-left: 0.25rem;
                        vertical-align: middle;
                      `}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </PageTools.Section>
  );
};

RelatedResources.propTypes = {
  className: PropTypes.string,
  resources: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
  title: PropTypes.string,
};

export default RelatedResources;
