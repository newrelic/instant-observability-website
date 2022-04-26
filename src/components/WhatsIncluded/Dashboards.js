import { PageTools } from '@newrelic/gatsby-theme-newrelic';
import { quickstart } from '../../types';
import QuickstartDashboards from '../../components/QuickstartDashboards';
import { css } from '@emotion/react';

const Dashboards = ({ quickstart }) => {

    return (
        <div
            css={css`
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
                {quickstart.dashboards?.length > 0 ? (
                    <QuickstartDashboards quickstart={quickstart} />
                ) : (

                    <p>
                        This quickstart doesn't include any dashboards. Do you think it should?
                        <br />
                        You can edit this quickstart to add helpful components. View the
                        repository and open a pull request.
                    </p>
                )}

            </PageTools.Section>
        </div>
    );
};

Dashboards.propTypes = {
    quickstart: quickstart.isRequired,
};

export default Dashboards;