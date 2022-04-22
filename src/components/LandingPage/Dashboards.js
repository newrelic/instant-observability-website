import { PageTools } from '@newrelic/gatsby-theme-newrelic';
import { quickstart } from '../../types';
import QuickstartDashboards from '../../components/QuickstartDashboards';
import EmptyTab from '../../components/EmptyTab';
import { css } from '@emotion/react';

const Dashboards = ({ quickstart }) => {

    return (
        <div>
        <PageTools.Section>
            <h1>
                What&apos;s included?
            </h1>
            <br />
            <h2>
                Dashboard
            </h2>

         
        </PageTools.Section>
        </div>
    );
};

Dashboards.propTypes = {
    quickstart: quickstart.isRequired,
};

export default Dashboards;