import { useTessen } from '@newrelic/gatsby-theme-newrelic';
import React from 'react';

import IOSeo from '@components/IOSeo';
import PageLayout from '@components/PageLayout';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql } from 'gatsby';
import { quickstart } from '../types';
import QuickstartHowToUse from '@components/QuickstartHowToUse';
import LandingPageFooter from '@components/LandingPageFooter';
import WhatsIncludedHeader from '@components/WhatsIncluded/WhatsIncludedHeader';
import Dashboards from '@components/WhatsIncluded/Dashboards';
import Alerts from '@components/WhatsIncluded/Alerts';
import DataSources from '@components/WhatsIncluded/DataSources';
import Layout from '@components/Layout';
import QuickstartOverview from '@components/QuickstartOverview';
import LandingBanner from '@components/LandingBanner';
import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '@data/constants';

const layoutContentSpacing = css`
  --page-margin: 156px;
  @media (max-width: 760px) {
    --page-margin: 30px;
  }
  max-width: 1248px;
  padding: 0 var(--site-content-padding);
  margin: auto;
`;

const QuickstartDetails = ({ data, location }) => {
  const quickstart = data.quickstarts;
  const tessen = useTessen();
  const quickStartMeta = [
    {
      name: 'quick_start_name',
      className: 'swiftype',
      'data-type': 'string',
      content: quickstart.title,
    },
  ];

  const trackQuickstart = (action, quickstart) => () =>
    tessen.track({
      eventName: 'instantObservability',
      category: action,
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
      quickstartUrl: quickstart.packUrl,
    });

  const tessenSupportTrack = (quickstart) => (action) => {
    tessen.track({
      eventName: 'instantObservability',
      category: action,
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
    });
  };

  return (
    <>
      <IOSeo
        title={quickstart.title}
        type="quickstarts"
        location={location}
        tags={quickstart.keywords}
        meta={quickStartMeta}
      />
      <PageLayout.Header
        css={css`
          --page-margin: 156px;
          @media (max-width: 760px) {
            --page-margin: 30px;
          }

          font-family: 'Söhne-Buch';
        `}
      >
        <LandingBanner
          css={css`
            padding: 0 var(--site-content-padding);

            @media screen and (max-width: 920px) {
              margin: 0 0 1rem 0;
              padding: 0 var(--site-content-padding);
            }
          `}
          quickstart={quickstart}
          location={location}
        />
      </PageLayout.Header>

      <Layout.Content>
        {/* What's included section here */}
        <div
          css={css`
            ${layoutContentSpacing};
            > * {
              padding-top: 3rem;
              @media screen and (min-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                :nth-child(2) {
                  padding-top: 1rem;
                }
              }
            }
          `}
        >
          <WhatsIncludedHeader />
          <Dashboards quickstart={quickstart} />
          <Alerts quickstart={quickstart} />
          <DataSources quickstart={quickstart} />
        </div>
        <div
          css={css`
            margin-top: 80px;
            margin-bottom: 80px;
            mix-blend-mode: normal;
            width: 50%;
            opacity: 0.84;
            border: 5px solid #e8e8e8;
            border-radius: 5px;
            transform: rotate(180deg);

            @media (max-width: 760px) {
              width: 100%;
            }
          `}
        />
        <div
          css={css`
            ${layoutContentSpacing};
            padding-bottom: 117px;
          `}
        >
          <QuickstartOverview quickstart={quickstart} />
        </div>
        {/* How to use this quickstart here */}
        <div
          css={css`
            @media not all and (min-resolution: 0.001dpcm) and max-width: 760px {
              @media {
                grid-template-columns: repeat(1, 1fr);
                margin-left: 40px;
                margin-right: 23px;
              }
            }

            @media (min-width: 760px) {
              padding-top: 38px;
              padding-bottom: 49px;
            }

            @media (max-width: 760px) {
              padding-top: 53px;
              padding-bottom: 63px;
            }

            background-color: #f1f2f2;
          `}
        >
          <QuickstartHowToUse
            quickstart={quickstart}
            trackQuickstart={trackQuickstart}
            location={location}
            layoutContentSpacing={layoutContentSpacing}
          />
        </div>
        {/* Get started component here */}
        <div
          css={css`
            ${layoutContentSpacing};

            padding-top: 30px;
            padding-bottom: 30px;
          `}
        >
          <LandingPageFooter
            quickstart={quickstart}
            trackQuickstart={trackQuickstart}
            tessenSupportTrack={tessenSupportTrack}
          />
        </div>
      </Layout.Content>
    </>
  );
};

QuickstartDetails.propTypes = {
  data: PropTypes.shape({
    quickstarts: quickstart,
  }),
  location: PropTypes.object.isRequired,
};

// NOTE: we hard-code `height: 45` for logos to match the CSS
// height set for the logo img tags.
export const pageQuery = graphql`
  query($id: String!) {
    quickstarts(id: { eq: $id }) {
      id
      name
      title
      relatedResources(limit: 5) {
        title
        url
      }
      level
      keywords
      description
      summary
      logo {
        ext
        publicURL
        childImageSharp {
          gatsbyImageData(
            height: 45
            placeholder: BLURRED
            formats: [AUTO, WEBP]
          )
        }
      }
      packUrl
      dashboards {
        description
        name
        screenshots {
          publicURL
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: [AUTO, WEBP])
          }
        }
      }
      alerts {
        details
        name
        type
      }
      documentation {
        name
        url
        description
      }
      authors
      installPlans {
        id
        name
      }
    }
  }
`;

export default QuickstartDetails;
