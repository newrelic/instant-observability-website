import QuickstartDataSources from '../QuickstartDataSources';
import { PageTools } from '@newrelic/gatsby-theme-newrelic';
import EmptyTab from '../EmptyTab';
import { css } from '@emotion/react';

const DataSources = ({ quickstart }) => {
    return (
        <div
            css={css`
        display: grid;
        grid-gap: 1rem;
        grid-template-columns: repeat(1, 1fr);

        @media (min-width: 760px) {
          margin-left: 156px;
          margin-top:51px;
        }

        @media (max-width: 760px) {
          margin-left: 40px;
          margin-right: 23px;
          margin-top: 52px;
          h6{
            margin-bottom: 23px;
          }
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
                <h6>
                    Data sources &nbsp;
                    <div
                        css={css`
                        display: inline-block;
                        background: var(--background-grey-color);
                        padding: 1px 4px;
                        border-radius: 3px;
                    `}
                    >
                        {quickstart.documentation.length}</div>
                </h6>
                {quickstart.documentation?.length > 0 ? (
                    <QuickstartDataSources quickstart={quickstart} />
                ) : (
                    <EmptyTab
                        quickstartUrl={quickstart.packUrl}
                        quickstartName={quickstart.title}
                        tabName="data sources"
                    />
                )}
            </PageTools.Section>
        </div>
    )
};

export default DataSources;