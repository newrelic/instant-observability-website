import React from 'react';
import { css } from '@emotion/react';
import { quickstart } from '../types';
import OverviewTile from './OverviewTile';
import Markdown from './Markdown';

const allowedElements = [
  'h1',
  'h2',
  'h3',
  'ol',
  'ul',
  'li',
  'p',
  'blockquote',
  'code',
  'a',
  'strong',
  'em',
  'hr',
  'img'
];


const textMD = `## Comprehensive monitoring quickstart for .NET

.NET Framework is a software product developed by Microsoft. It is a platform used on the Microsoft Windows operating system to build desktop and web applications and supports many programming languages.

### Why monitor .NET?

.NET monitoring is an essential activity in .NET software development that enables software developers to observe the performance of an application in real-time. .NET monitoring enables a swift intervention if issues arise while the application runs.

### What should you look for in a .NET Monitor?

An ideal must offer comprehensive and actionable information that software developers need to troubleshoot an application successfully. Some key components are:

- Preemptive performance monitoring
- Comprehensive full-stack performance monitoring
- Intimate code insights
- Granular error identification mechanism
- Comprehensive .NET Framework, Common Language Runtime (CLR), and Internet Information Services (IIS) monitoring

![.NET Performance Monitor](https://raw.githubusercontent.com/newrelic/newrelic-quickstarts/main/quickstarts/dotnet/dotnet/images/Transactions.png) 

### What's included in this quickstart:

- High-value alerts
- Code-related insights that acquaint developers with the intricate details of their application’s health and status by providing detailed information on errors, database queries, and transaction traces
- Alerts that proactively inform developers about the status of their applications

![.NET Performance Monitor](https://raw.githubusercontent.com/newrelic/newrelic-quickstarts/main/quickstarts/dotnet/dotnet/images/Transactions.png) 

### What makes this quickstart unique?

With this quickstart, you can monitor health and status in one place, focus on the most important information, and enable preventative maintenance strategy.

![.NET Performance Monitor](https://raw.githubusercontent.com/newrelic/newrelic-quickstarts/main/quickstarts/dotnet/dotnet/images/Transactions.png)`

const QuickstartOverview = ({ quickstart }) => {
  return (
    <>
      <h2> What&apos;s included </h2>
      <div
        css={css`
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: repeat(3, 1fr);

          @media (max-width: 1180px) {
            grid-template-columns: repeat(1, 1fr);
          }
        `}
      >
        {quickstart.dashboards.map((dashboard, index) => (
          <OverviewTile
            key={index}
            title={dashboard.name}
            image={dashboard.screenshots[0]}
            description={dashboard.description}
            tag="Dashboard"
          />
        ))}
        {quickstart.alerts.map((alert, index) => (
          <OverviewTile
            key={index}
            title={alert.name}
            description={alert.details}
            tag="Alert"
          />
        ))}
        {quickstart.documentation.map((doc, index) => (
          <OverviewTile
            key={index}
            title={doc.name}
            description={doc.description}
            tag="Doc"
          />
        ))}
      </div>
      {quickstart.description && (
        <div
          css={css`
            h1,
            h2,
            h3 {
              margin: 1em 0 0.25em 0;
            }
            p,
            pre {
              margin-left: 1em;
            }
            h1,
            h2 {
              font-size: 1.5em;
              font-weight: 600;
            }
            h3 {
              font-size: 1.2em;
            }
          `}
        >
          <Markdown
            skipHtml
            allowedElements={allowedElements}
            css={css`
              margin: 2em 0;
            `}
          >
          {/* {quickstart.description} */}
            {textMD}
          </Markdown>
        </div>
      )}
    </>
  );
};

QuickstartOverview.propTypes = {
  quickstart: quickstart.isRequired,
};

export default QuickstartOverview;
