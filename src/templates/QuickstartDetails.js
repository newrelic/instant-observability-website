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

const layoutContentSpacing = css`
  --page-margin: 156px;
  @media (max-width: 760px) {
    --page-margin: 30px;
  }
  max-width: 1248px;
  padding: 0 var(--site-content-padding);
  margin: auto;
`;

/*
 * Callback function for sorting data sources and
 * prioritizing default ordering
 * @param {Object} a - Object with react component and length of quickstart component
 * @param {Object} b - Object with react component and length of quickstart component
 * @returns number
 */
const sortComponents = (a, b) => {
  if (a.count < 1) {
    return 1;
  } else if (b.count < 1) {
    return -1;
  } else {
    return 0;
  }
};

const sortOrderedQuickstartComponents = (quickstart) => {
  // get length of all components
  const dashboardLength = quickstart.dashboards?.length ?? 0;
  const alertLength = quickstart.alerts?.length ?? 0;

  // we use documentation for datasources at the moment
  const dataSourceLength = quickstart.documentation?.length ?? 0;

  // sort by length
  const componentsAndCounts = [
    {
      component: Dashboards,
      count: dashboardLength,
    },
    { component: Alerts, count: alertLength },
    { component: DataSources, count: dataSourceLength },
  ];

  return componentsAndCounts.sort(sortComponents);
};

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
              margin-bottom: 3rem;
            }
          `}
        >
          <WhatsIncludedHeader />
          {sortOrderedQuickstartComponents(quickstart).map((obj, index) => (
            <obj.component key={index} quickstart={quickstart} />
          ))}
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

            background: #e8e8e8;
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
      title
      keywords
      ...LandingBanner_quickstart
      ...Dashboards_quickstart
      ...Alerts_quickstart
      ...DataSources_quickstart
      ...QuickstartOverview_quickstart
      ...QuickstartHowToUse_quickstart
      ...LandingPageFooter_quickstart
    }
  }
`;

export default QuickstartDetails;
