import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import {
  Surface,
  Icon,
  useTessen,
  Tag,
  Link,
} from '@newrelic/gatsby-theme-newrelic';
import { SHIELD_LEVELS, RESERVED_QUICKSTART_IDS } from '../data/constants';
import QuickstartImg from './QuickstartImg';

import { QUICKSTARTS_COLLAPSE_BREAKPOINT } from '../data/constants';

import './fonts.scss';

const QuickstartTile = ({
  id,
  title,
  featured,
  name,
  fields,
  logoUrl,
  level,
  className,
  summary,
  href,
}) => {
  const tessen = useTessen();

  const handlePackClick = (quickstartId) => {
    switch (true) {
      case quickstartId === RESERVED_QUICKSTART_IDS.GUIDED_INSTALL:
        tessen.track({
          eventName: 'instantObservability',
          category: 'GuidedInstallClick',
          quickstartName: name,
        });
        break;
      case quickstartId === RESERVED_QUICKSTART_IDS.BUILD_YOUR_OWN_QUICKSTART:
        tessen.track({
          eventName: 'instantObservability',
          category: 'BuildYourOwnQuickstartClick',
          quickstartName: name,
        });
        break;
      default:
        tessen.track({
          eventName: 'instantObservability',
          category: 'QuickstartClick',
          quickstartName: name,
        });
    }
  };

  return (
    <Surface
      as={Link}
      to={href || fields?.slug || '/'}
      key={id}
      base={Surface.BASE.PRIMARY}
      className={className}
      interactive
      css={css`
        --tile-image-height: 100px; /* Logo image height */
        --title-row-height: auto; /* Title height to allow space for longer string */
        padding: 0 22px 35px 24px;
        overflow: hidden;
        height: 360px;
        width: 250px;
        margin: 0 auto;
        border: 1px solid #e4e5e6;
        border-radius: 8px;
        box-shadow: none;

        @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
        padding: 0 32px 24px 32px;
          width: 80%;
          min-width: 250px;
        }

        h4,
        p,
        span {
          font-family: 'Söhne-Leicht';
          letter-spacing: -0.5%;
          color: #1d252c;
          font-weight: 600;

          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          width: 100%;
          font-family: 'Söhne-Buch';
          font-weight: 400;
        }

        }

        display: grid;
        align-items: flex-start;
        grid-gap: 0.2rem;
        grid-template-rows: var(--tile-image-height) 152px auto;
        grid-template-columns: auto;
        grid-template-areas:
          'logo logo'
          'text text'
          'tag arrow';

          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
        grid-template-rows: 125px; 152px auto;
        }

      `}
      onClick={() => handlePackClick(id)}
    >
      <div
        css={css`
          align-items: center;
          display: flex;
          grid-area: logo;
          height: 100%;
          justify-content: flex-start;
          margin-bottom: 1rem;
        `}
      >
        <div
          css={css`
            height: var(--tile-image-height);
          `}
        >
          <QuickstartImg
            logoUrl={logoUrl}
            packName={title || name}
            css={css`
              object-fit: scale-down;
              height: 45px;
              margin: 35px 0 0;

              @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                margin: 20px 0 0;
                height: 70px;
                max-width: 240px;
              }
            `}
          />
        </div>
      </div>

      <div
        css={css`
          grid-area: text;
        `}
      >
        <h4
          css={css`
            grid-area: title;
            font-size: 24px;
            letter-spacing: -0.5%;
          `}
        >
          {title}{' '}
          {SHIELD_LEVELS.includes(level) && <Icon name="nr-check-shield" />}
        </h4>

        <div
          css={css`
            grid-area: summary;
            align-self: flex-start;
          `}
        >
          <p
            css={css`
              font-size: 18px;
              line-height: 24px;

              /* Limits the number of lines */
              overflow: hidden;
              display: -webkit-box;
              text-overflow: ellipsis;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;

              @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
                -webkit-line-clamp: 2;
              }
            `}
          >
            {summary || 'No summary provided'}
          </p>
        </div>
      </div>

      <div
        css={css`
          justify-self: start;
          align-self: end;
          grid-area: tag;
        `}
      >
        <Tag
          css={css`
            background: #e4e5e6;
            border-radius: 4px;
            font-weight: 600;
            height: 32px;
            width: 100px;
            padding: 3px 8px 5px;
            color: red;
            line-spacing: unset;
          `}
        >
          Read more
        </Tag>
      </div>
      <div
        css={css`
          grid-area: arrow;
          justify-self: end;
          align-self: end;
        `}
      >
        <Icon
          css={css`
            height: 16px;
            color: #1d252c;
          `}
          name="fe-arrow-right"
          size="120%"
        />
      </div>
    </Surface>
  );
};

QuickstartTile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  fields: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }).isRequired,
  logoUrl: PropTypes.string,
  summary: PropTypes.string,
  level: PropTypes.string,
  className: PropTypes.string,
  featured: PropTypes.bool,
  href: PropTypes.string,
};

export default QuickstartTile;
