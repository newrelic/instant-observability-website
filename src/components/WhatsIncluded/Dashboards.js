import { PageTools } from '@newrelic/gatsby-theme-newrelic';
import { quickstart } from '../../types';
import QuickstartDashboards from '../../components/QuickstartDashboards';
import { css } from '@emotion/react';
import EmptyTab from '../../components/EmptyTab';

const Dashboards = ({ quickstart }) => {

    return (
        <div
            css={css`

        @media (min-width: 760px) {
          margin-left: 156px;
     
        }

        @media (max-width: 760px) {
          margin-left: 40px;
          margin-right: 23px;
          
        }

        @media not all and (min-resolution:.001dpcm) and max-width: 760px { 
            @media {
                grid-template-columns: repeat(1, 1fr);
                margin-left: 40px;
              margin-right: 23px;
            }}
        `}
        >
            <PageTools.Section
                css={css`
            padding: 0px !important;
            `}>
                <h3
                    css={css`
                margin-bottom: 45px;
                font-weight: 400 !important;
             
                @media (min-width: 760px) {
                    margin-bottom: 47px;
                    margin-top: 71px;
                  }

                  @media (max-width: 760px) {
                    margin-top: 23px;
                  }

                `}>
                    What&apos;s included?
                </h3>
                <h6>
                    Dashboard
                    &nbsp;
                    <div
                        css={css`
                        display: inline-block;
                        background: var(--background-grey-color);
                        padding: 1px 4px;
                        border-radius: 3px;
                    `}
                    >
                        {quickstart.dashboards.length}</div>
                </h6>
                {quickstart.dashboards?.length > 0 ? (
                    <QuickstartDashboards quickstart={quickstart} />
                ) : (
                    <EmptyTab
                        quickstartUrl={quickstart.packUrl}
                        quickstartName={quickstart.title}
                        tabName="dashboards"
                    />
                )}

            </PageTools.Section>
        </div>
    );
};

Dashboards.propTypes = {
    quickstart: quickstart.isRequired,
};

export default Dashboards;