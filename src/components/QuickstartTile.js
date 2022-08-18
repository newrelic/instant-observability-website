import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Surface from '@newrelic/gatsby-theme-newrelic/src/components/Surface';
import Icon from '@newrelic/gatsby-theme-newrelic/src/components/Icon';
import Tag from '@newrelic/gatsby-theme-newrelic/src/components/Tag';
import Link from '@newrelic/gatsby-theme-newrelic/src/components/Link';
import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';
import {
  SHIELD_LEVELS,
  RESERVED_QUICKSTART_IDS,
  QUICKSTARTS_COLLAPSE_BREAKPOINT,
} from '@data/constants';
import QuickstartImg from './QuickstartImg';

const QuickstartTile = ({
  id,
  slug,
  title,
  name,
  logo,
  logoSvg,
  level,
  className,
  summary,
  href,
  customClickHandler,
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
      to={href || slug || '/'}
      key={id}
      base={Surface.BASE.PRIMARY}
      className={className}
      interactive
      css={css`
        --tile-image-height: 100px; /* Logo image height */
        --title-row-height: auto; /* Title height to allow space for longer string */
        --tile-content-height: 180px;
        padding: 0 22px 35px 24px;
        overflow: hidden;
        height: 360px;
        min-width: 250px;
        border: 1px solid #e4e5e6;
        border-radius: 8px;
        box-shadow: none;
        background-color: var(--color-white);

        @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          padding: 0 32px 24px 32px;
          width: 100%;
          min-width: 250px;
        }

        h4,
        p,
        span {
          letter-spacing: -0.5%;
          color: var(--primary-text-color);
          font-weight: 300;

          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            width: 100%;
            font-weight: 400;
          }
        }

        display: grid;
        align-items: flex-start;
        grid-gap: 0.2rem;
        grid-template-rows: var(--tile-image-height) var(--tile-content-height) auto;
        grid-template-columns: auto;
        grid-template-areas:
          'logo logo'
          'text text'
          'tag arrow';
      `}
      onClick={() => customClickHandler ? customClickHandler() : handlePackClick(id)}
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
            imageNode={logo}
            svgNode={logoSvg}
            packName={title || name}
            css={css`
              object-fit: scale-down;
              object-position: left;
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
          height: var(--tile-content-height);
          overflow: hidden;
          display: flex;
          flex-flow: column wrap;
        `}
      >
        <h4
          css={css`
            font-weight: normal;
            font-size: 24px;
            letter-spacing: -0.5%;
          `}
        >
          {title}{' '}
          {SHIELD_LEVELS.includes(level) && <Icon name="nr-check-shield" />}
        </h4>

        <div>
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
            height: 32px;
            width: 100px;
            padding: 3px 8px 5px;
            line-spacing: unset;

            .dark-mode & {
              background: #e4e5e6;
              color: #1d252c;

            @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
              padding: 5px 12px 8px;
              font-size: 14px;
            }
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
          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            height: 35px;
          }
        `}
      >
        <Icon
          css={css`
            height: 16px;
            color: #1d252c;
            @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
              margin-top: 12px;
              height: 24px;
            }
          `}
          name="fe-arrow-right"
        />
      </div>
    </Surface>
  );
};

QuickstartTile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  logo: PropTypes.object,
  logoSvg: PropTypes.object,
  summary: PropTypes.string,
  level: PropTypes.string,
  className: PropTypes.string,
  href: PropTypes.string,
  customClickHandler: PropTypes.func,
};

export default QuickstartTile;
