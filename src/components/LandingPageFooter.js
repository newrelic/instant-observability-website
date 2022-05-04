import React from 'react';
import {
    Link,
    Button,
    PageTools,
} from '@newrelic/gatsby-theme-newrelic';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import SupportSection from './SupportSection';
import ExternalLink from '@newrelic/gatsby-theme-newrelic/src/components/ExternalLink';
import RelatedResources from './RelatedResources';
import TickIconSVG from './Icons/TickIconSVG';
import GitHubIconSVG from './Icons/GitHubIconSVG';

const LandingPageFooter = ({
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
                    font-size: 18px;

                    @media (max-width: 760px) {
                        grid-template-columns: repeat(1, 1fr);
                        margin-left: 40px;
                      margin-right: 23px;
                      h6{
                        margin-bottom: 15px;
                      }
                    }

                    @media (min-width: 760px) {
                      margin-left: 156px;
                        margin-right: 155px;
                      h6 {
                            line-height: 32px;
                      }
                    }

                    @media not all and (min-resolution:.001dpcm) and max-width: 760px { 
                        @media {
                            grid-template-columns: repeat(1, 1fr);
                            margin-left: 40px;
                          margin-right: 23px;
                        }}
          `}>
                <PageTools.Section
                 css={css`
                 padding-left: 0px !important;
                 `}>
                    <h6
                      css={css`
                      width: 265px;
                      height: 32px;
                      margin-bottom: 66px;
                      `}>
                        Authors
                    </h6>
                    <p
                    css={css`
                    line-height: 28px;
                    `}>
                        {quickstart.authors.join(', ')}
                    </p>
                </PageTools.Section>

                <PageTools.Section
                 css={css`
                 padding-left: 0px !important;
                 `}>
                    <h6
                      css={css`
                      width: 263px;
                      height: 32px;
                      margin-bottom: 58px;
                      `}>
                        Support
                    </h6>
                    <div>
                        <SupportSection
                            supportLevel={quickstart.level}
                            onClick={tessenSupportTrack(quickstart)}
                        />
                    </div>
                </PageTools.Section>

                <PageTools.Section
                 css={css`
                 padding-left: 0px !important;
                 `}>
                    <h6
                        css={css`
                        width: 264px;
                        height: 64px;
                        margin-bottom: 33px;
                        `} >
                        Collaborate on this quickstart
                    </h6>
                    <div>
                        <Button
                            css={css`
                                background: var(--background-color);
                        
                                color: var(--btn-text-color);
                                border-radius: 4px;
                                padding: 13.5px 20px 13.5px 22px;
                                column-gap: 14.45px; 
                                font-weight: 400; 
                                &:hover{
                                    color: var(--white-hover-color);
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
                            <GitHubIconSVG className="ViewRepo" />
                            View repo
                        </Button>
                    </div>
                    <div
                        css={css`
                        margin-top: 14px;
                        `}
                    >
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
                                background: var(--background-color);
                                color: var(--btn-text-color);
                                border-radius: 4px;
                                padding: 13.5px 20px 13.5px 22px;
                                column-gap: 14.45px;   
                                font-weight: 400; 
                                height: 48px;
                                &:hover{
                                    color: var(--white-hover-color);
                                }

                                @media (max-width: 760px) {
                                    width: 100%;
                                }
                                `}
                        >
                            <TickIconSVG
                                className="Tick" />
                            Build your own
                        </Button>
                    </div>
                </PageTools.Section>

                <PageTools.Section
                 css={css`
                 padding-left: 0px !important;
                 `}>
                    <h6
                      css={css`
                      width: 265px;
                      height: 32px;
                      margin-bottom: 67px;
                      `}>
                        Related Resources
                    </h6>
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

LandingPageFooter.propTypes = {
    quickstart: quickstart.isRequired,
};

export default LandingPageFooter;