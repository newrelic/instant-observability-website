import { PageTools } from '@newrelic/gatsby-theme-newrelic';
import { quickstart } from '../../types';
import QuickstartDashboards from '../../components/QuickstartDashboards';
import EmptyTab from '../../components/EmptyTab';
import { css } from '@emotion/react';

const Dashboards = ({ quickstart }) => {

    return (
        <div
            css={css`
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(1, 1fr);
        h1 {
            margin-bottom: 58px;
        }

        @media (min-width: 760px) {
          margin-left: 156px;
     
        }

        @media (max-width: 760px) {
          margin-left: 40px;
          margin-right: 23px;
          
        }
        `}
        >
            <PageTools.Section>
                <h1>
                    What&apos;s included?
                </h1>
                <h2>
                    Dashboard
                    &nbsp;
                    <div
                        css={css`
                        display: inline-block;
                        background: #D6D6D6;
                        padding: 4px 6px 4px 6px;
                        border-radius: 3px;
                    `}
                    >
                        {quickstart.dashboards.length}</div>
                </h2>

            </PageTools.Section>
        </div>
    );
};

Dashboards.propTypes = {
    quickstart: quickstart.isRequired,
};

export default Dashboards;