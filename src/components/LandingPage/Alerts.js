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
            // margin-right: 155px;
        }

        @media (max-width: 760px) {
          margin-left: 40px;
          margin-right: 23px;
        }
        `}
        >
            <PageTools.Section>
                <h2>
                    Alerts &nbsp;
                    <div
                        css={css`
                        display: inline-block;
                        background: #D6D6D6;
                        padding: 4px 6px 4px 6px;
                        border-radius: 3px;
                    `}
                    >
                        {quickstart.alerts.length}</div>
                </h2>
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