import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';
import React from 'react';

import IOSeo from '@components/IOSeo';
import PageLayout from '@components/PageLayout';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql } from 'gatsby';
import { quickstart } from '../types';
import sortedQuickstartComponents from '@utils/sortedQuickstartComponents';
import QuickstartHowToUse from '@components/QuickstartHowToUse';
import LandingPageFooter from '@components/LandingPageFooter';
import WhatsIncludedHeader from '@components/WhatsIncluded/WhatsIncludedHeader';
import Layout from '@components/Layout';
import QuickstartOverview from '@components/QuickstartOverview';
import LandingBanner from '@components/LandingBanner';
import isNRPartner from '@utils/isNRPartner';

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
  const urlParams = new URLSearchParams(location.search);

  const quickStartMeta = [
    {
      name: 'quick_start_name',
      className: 'swiftype',
      'data-type': 'string',
      content: quickstart.title,
    },
  ];

  const partner = isNRPartner(quickstart.keywords);

  const trackQuickstart = (action, quickstart) => () =>
    tessen.track({
      eventName: 'instantObservability',
      category: action,
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
      quickstartUrl: quickstart.packUrl,
      urlParams: Object.fromEntries([...urlParams]),
      partner,
    });

  const tessenSupportTrack = (quickstart) => (action) => {
    tessen.track({
      eventName: 'instantObservability',
      category: action,
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
      partner,
    });
  };

  return (
    <>
      <IOSeo
        title={quickstart.title}
        name={quickstart.name}
        type="quickstarts"
        location={location}
        tags={quickstart.keywords}
        meta={quickStartMeta}
        summary={quickstart.summary}
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
          {sortedQuickstartComponents(quickstart).map((obj, index) => (
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

export const pageQuery = graphql`
  query($id: String!) {
    quickstarts(id: { eq: $id }) {
      id
      name
      title
      keywords
      packUrl

      ...LandingBanner_quickstart

      ...QuickstartDashboards_quickstart

      ...QuickstartAlerts_quickstart

      ...QuickstartDocumentation_quickstart

      ...QuickstartOverview_quickstart

      ...LandingPageFooter_quickstart

      ...InstallButton_quickstart
    }
  }
`;

export default QuickstartDetails;
