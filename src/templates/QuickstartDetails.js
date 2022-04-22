import {
  Button,
  Icon,
  Layout,
  Link,
  useTessen,
} from '@newrelic/gatsby-theme-newrelic';
import {
  QUICKSTARTS_REPO,
  SHIELD_LEVELS
} from '../data/constants';
import React, { useEffect, useState } from 'react';

import Breadcrumbs from '../components/Breadcrumbs';
import IOSeo from '../components/IOSeo';
import InstallButton from '../components/InstallButton';
import PageLayout from '../components/PageLayout';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql } from 'gatsby';
import { quickstart } from '../types';
import QuickstartHowToUse from '../components/QuickstartHowToUse';
import Dashboards from '../components/LandingPage/Dashboards';
import Alerts from '../components/LandingPage/Alerts';
import DataSources from '../components/LandingPage/DataSources';
import Authors from '../components/Authors';

const QuickstartDetails = ({ data, location }) => {

  const [imgStyle, setImgStyle] = useState({});

  const quickstart = data.quickstarts;
  const quickstartUrl = quickstart.packUrl || QUICKSTARTS_REPO;
  const tessen = useTessen();
  const breadcrumbs = [
    {
      name: 'Instant Observability (I/O)',
      url: '/',
    },
    {
      name: quickstart.title,
    },
  ];
  const quickStartMeta = [
    {
      name: 'quick_start_name',
      class: 'swiftype',
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

  // get image resolution from URL
  const getURLMeta = async (url) => {
    const img = new Image();
    img.src = url;
    const { width, height } = await new Promise(resolve => {
      img.onload = function () {
        resolve({
          width: this.width,
          height: this.height
        })
      }
    })
    return { width, height }
  };

  const getImgStyle = async () => {
    const { width, height } = await getURLMeta(quickstart.logoUrl)
    const style = {};
    // if image is rectangle
    if (width > height) {
      style.width = '';
      style.height = '';
    } else {
      style.width = '80px'
      style.height = '80px'
    }
    setImgStyle(style);
  };

  useEffect(() => {
    getImgStyle();
  }, [quickstart.logoUrl])

  return (
    <>
      <IOSeo
        title={quickstart.title}
        type="quickstarts"
        location={location}
        tags={quickstart.keywords}
        meta={quickStartMeta}
      />
      <Breadcrumbs segments={breadcrumbs} />
      <PageLayout
        type={PageLayout.TYPE.RELATED_CONTENT_TABS}
        css={css`
            grid-template-columns: minmax(0, 1fr);
          `}
      >
        <PageLayout.Header
          title={quickstart.title}
          icon={
            SHIELD_LEVELS.includes(quickstart.level) && (
              <Icon
                name="nr-check-shield"
                size="50%"
                css={css`
                    width: 0.75rem;
                    height: 1rem;
                    margin-left: 0.5rem;
                  `}
              />
            )
          }
          css={css`
              border-bottom: none;
              display: grid;
              grid-column-gap: 1rem;
              grid-row-gap: 1rem;
              grid-template-areas:
                'title logo'
                'summ logo'
                'cta logo';
              justify-content: normal;
              justify-self: center;
              row-gap: 1rem;
              width: 101%;

              h1 {
                font-weight: normal;
                grid-area: title;
                padding-bottom: 1rem;
              }

              @media (min-width: 760px) {
                background: var(--primary-background-color);
                border-bottom: 1px solid var(--border-color);
                border-radius: 0.25rem;
                grid-template-areas:
                  'logo title cta'
                  'logo summ cta';
                padding: 16px 0 24px;
                position: sticky;
                top: var(--global-header-height);
                z-index: 80;
              }

              .dark-mode {
                box-shadow: none;
              }
            `}
        >
          {quickstart.logoUrl && (
            <img
              style={imgStyle}
              src={quickstart.logoUrl}
              alt={quickstart.title}
              css={css`
                  max-height: 100%;
                  max-width: 12rem;
                  width: 100%;
                  grid-area: logo;
                  align-self: center;
                  justify-self: center;

                  .dark-mode & {
                    background-color: white;
                  }

                  @media (max-width: 760px) {
                    display: none;
                  }
                `}
            />
          )}
          {quickstart.summary && (
            <div
              css={css`
                  grid-area: summ;
                  max-width: 50vw;

                  @media (max-width: 760px) {
                    max-width: 100%;
                  }
                `}
            >
              {quickstart.summary}
            </div>
          )}
          <div
            css={css`
                grid-area: cta;
                display: flex;
                justify-content: center;
                align-self: center;
                @media (max-width: 760px) {
                  flex-direction: column;
                  align-items: stretch;
                }
              `}
          >
            <InstallButton quickstart={quickstart} location={location} />
            <Button
              as={Link}
              variant={Button.VARIANT.OUTLINE}
              to={quickstartUrl}
              rel="noopener noreferrer"
              css={css`
                  margin: 0 0 0 0.5rem;
                  @media (max-width: 760px) {
                    margin: 1rem 0 0 0;
                  }
                `}
              onClick={trackQuickstart('QuickstartViewRepoClick', quickstart)}
            >
              <Icon
                name="fe-github"
                css={css`
                    margin-right: 7px;
                  `}
              />
              View repo
            </Button>
          </div>
        </PageLayout.Header>

        <Layout.Content
          css={css`
          width: 100%;
          `}>
          {/* What's included section here */}
          <div
            css={css`
                display: grid;
                grid-gap: 1rem;
                grid-template-columns: repeat(1, 1fr);

                @media (min-width: 760px) {
                  margin-left: 156px;
                }

                @media (max-width: 760px) {
                  margin-left: 40px;
                  margin-right: 39px;
                }
              `}
          >
            <Dashboards quickstart={quickstart} />
            <Alerts quickstart={quickstart} />
            <DataSources quickstart={quickstart} />
          </div>

          {/* How to use this quickstart here */}
          <div
            css={css`
             background-color: #F1F2F2;        
          `}>
            <QuickstartHowToUse
              quickstart={quickstart}
              trackQuickstart={trackQuickstart}
              tessenSupportTrack={tessenSupportTrack}
            />
          </div>
          {/* Get started component here */}

          <Authors quickstart={quickstart}
            trackQuickstart={trackQuickstart}
            tessenSupportTrack={tessenSupportTrack}
          />

        </Layout.Content>
      </PageLayout>
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
      name
      title
      relatedResources(limit: 5) {
        title
        url
      }
      level
      keywords
      id
      description
      summary
      logoUrl
      packUrl
      dashboards {
        description
        name
        screenshots
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
