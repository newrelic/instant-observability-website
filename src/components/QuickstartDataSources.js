import React from 'react';
import { css } from '@emotion/react';
import pluralize from 'pluralize';
import { Surface, Link, Tag, useTessen } from '@newrelic/gatsby-theme-newrelic';
import Intro from './Intro';
import { quickstart } from '../types';
import EbookIconSVG from './Icons/EbookIconSVG';

const QuickstartDataSources = ({ quickstart }) => {
  const tessen = useTessen();

  const handleDocsTileClick = () => {
    tessen.track({
      eventName: 'instantObservability',
      category: 'DocsTileClick',
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
    });
  };

  return (
    <>
      <Intro
        css={css`
          margin-bottom: 16px;
          color: var(--black-text-color);
        `}
      >
        {quickstart.title} observability quickstart contains{' '}
        {pluralize('data source', quickstart.documentation?.length ?? 0, true)}.
        This is how you'll get your data into New Relic.{' '}
      </Intro>

      <div 
        css={css`
          display: grid;
          grid-gap: 1rem;
          grid-template-columns: repeat(4, 1fr);
          color: var(--black-text-color);

          @media (max-width: 1180px) {
            grid-template-columns: repeat(1, 1fr);
          }

          .data-source-card {
          box-shadow: none;
        }
        `}
      >
        {quickstart.documentation.map((doc, index) => (
          <Surface className='data-source-card'
            key={index}
            as={Link}
            to={doc.url}
            base={Surface.BASE.PRIMARY}
            onClick={handleDocsTileClick}
            css={css`
              padding: 2rem;
              color: inherit;
              &:hover{
                color: #1D252C;
              }
            `}
            interactive
          >
            <EbookIconSVG className="Ebook"
              css={css`
             width: 0.75rem;
             height: 1rem;
             margin-left: 0.5rem;
             margin-top: 27px;
             
           `}
            />
            <p
              css={css`
                font-family: 'Söhne-Kräftig';
                margin-top: 16px;
                margin-bottom: 16px;
                `}>
              {doc.name}
            </p>

            {doc.description &&
              <p>
                {doc.description}
              </p>

            }

          </Surface>
        ))}
      </div>
    </>
  );
};

QuickstartDataSources.propTypes = {
  quickstart: quickstart.isRequired,
};

export default QuickstartDataSources;
