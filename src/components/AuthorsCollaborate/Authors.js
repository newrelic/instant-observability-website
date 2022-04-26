import React from 'react';
import {
    Link,
    Button,
    PageTools,
    Icon,
} from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { quickstart } from '../../types';
import SupportSection from '../SupportSection';
import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import RelatedResources from './RelatedResources';

const Authors = ({
    quickstart,
    trackQuickstart,
    tessenSupportTrack,
}) => {
    const quickstartUrl = quickstart.packUrl || QUICKSTARTS_REPO;
    return (
        <>
            <div
                css={css`
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    gap: 10px;
                    grid-auto-rows: minmax(100px, auto);

                    @media (max-width: 760px) {
                        grid-template-columns: repeat(1, 1fr);
                        margin-left: 40px;
                      margin-right: 23px;
                    }

                    @media (min-width: 760px) {
                      margin-left: 156px;
                        
                      h3 {
                          margin-bottom: 58px
                      }
                    }
          `}>
                <PageTools.Section>
                    <h3>
                        Authors
                    </h3>
                    <p>
                        {quickstart.authors.join(', ')}
                    </p>
                </PageTools.Section>

                <PageTools.Section>
                    <h3>
                        Support
                    </h3>
                    <div
                        css={css`
                    color: #1D252C;
                    `}>
                        <SupportSection
                            supportLevel={quickstart.level}
                            onClick={tessenSupportTrack(quickstart)}
                        />
                    </div>
                </PageTools.Section>

                <PageTools.Section>
                    <h3>
                        Collaborate on this quickstart
                    </h3>
                    <PageTools.Title>
                        <Button
                            css={css`
                                background: #1D252C;
                                color: #F9FAFA;
                                border-radius: 4px;
                                padding: 12px 20px 12px 20px;
                                &:hover{
                                    color: #F9FAFA;;
                                  }

                                @media (max-width: 760px) {
                                    width: 100%;
                                }
                                `}
                            as={Link}
                            variant={Button.VARIANT.OUTLINE}
                            to={quickstartUrl}
                            rel="noopener noreferrer"
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
                    </PageTools.Title>
                    <PageTools.Title>
                        <Button
                            as={ExternalLink}
                            variant={Button.VARIANT.OUTLINE}
                            to="https://developer.newrelic.com/contribute-to-quickstarts/"
                            instrumentation={{
                                component: 'GlobalFooter',
                                eventName: 'instantObservability',
                                category: 'BuildYourOwnQuickstartClick',
                            }}
                            css={css`
                                background: #1D252C;
                                color: #F9FAFA;
                                border-radius: 4px;
                                padding: 12px 20px 12px 20px;
                                &:hover{
                                    color: #F9FAFA;;
                                }

                                @media (max-width: 760px) {
                                    width: 100%;
                                }
                                `}
                        >
                            <Icon
                                name="zap"
                                css={css`
                    margin-right: 7px;
                  `}
                            />
                            Build your own
                            <Icon
                                name="external-link"
                                css={css`
                  margin-left: 7px;
                  `}
                            />
                        </Button>
                    </PageTools.Title>
                </PageTools.Section>

                <PageTools.Section>
                    <h3>
                        Related Resources
                    </h3>
                    <RelatedResources
                        css={css`
                            padding: 0;
                            `}
                        resources={quickstart.relatedResources}
                    />

                </PageTools.Section>
            </div>
        </>

    );

};

Authors.propTypes = {
    quickstart: quickstart.isRequired,
};

export default Authors;