import { PageTools } from '@newrelic/gatsby-theme-newrelic';
import QuickstartAlerts from '../../components/QuickstartAlerts';
import EmptyTab from '../../components/EmptyTab';
import { css } from '@emotion/react';

const Alerts = ({ quickstart }) => {

    return (
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
            <PageTools.Section>
                <h6>
                    Alerts &nbsp;
                    <div
                        css={css`
                        display: inline-block;
                        background: var(--background-grey-color);
                        margin: 0px 8px;
                        padding: 1px 4px;
                        border-radius: 3px;
                    `}
                    >
                        {quickstart.alerts.length}</div>
                </h6>
                {quickstart.alerts?.length > 0 ? (
                    <QuickstartAlerts quickstart={quickstart} />
                ) : (
                    <EmptyTab
                        quickstartUrl={quickstart.packUrl}
                        quickstartName={quickstart.title}
                        tabName="alerts"
                    />
                )}
            </PageTools.Section>
        </div>
    )
};

export default Alerts;