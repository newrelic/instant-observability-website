import React from 'react';
import { css } from '@emotion/react';
import pluralize from 'pluralize';
import { Surface } from '@newrelic/gatsby-theme-newrelic';
import Intro from './Intro';
import { quickstart } from '../types';
import AlertIconSVG from './Icons/AlertIconSVG';

const QuickstartAlerts = ({ quickstart }) => (
  <>
    <Intro
      css={css`
        margin-bottom: 16px;
        color: var(--black-text-color);
      `}
    >
      {quickstart.title} observability quickstart contains{' '}
      {pluralize('alert', quickstart.alerts?.length ?? 0, true)}. These alerts
      detect changes in key performance metrics. Integrate these alerts with
      your favorite tools (like Slack, PagerDuty, etc.) and New Relic will let
      you know when something needs your attention.
    </Intro>

    <div
      css={css`
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(4, 1fr);
        color: var(--black-text-color);

        @media (max-width: 760px) {
          grid-template-columns: repeat(1, 1fr);
        }
        .esuq8iu0 {
          box-shadow: none;
        }
      `}

    >
      {quickstart.alerts.map((alert, index) => (
        <Surface
          key={index}
          base={Surface.BASE.PRIMARY}
          css={css`
            padding: 2rem;
          `}
        >
          <AlertIconSVG className="Alert"
            css={css`
            width: 0.75rem;
            height: 1rem;
            margin-left: 0.5rem;
      
          `}
          />
          <h3
            css={css`
          margin-top: 16px;
          margin-bottom: 16px;
          `}>
            {alert.name}
          </h3>
          {alert.details && <p>{alert.details}</p>}
        </Surface>
      ))}
    </div>
  </>
);

QuickstartAlerts.propTypes = {
  quickstart: quickstart.isRequired,
};

export default QuickstartAlerts;
