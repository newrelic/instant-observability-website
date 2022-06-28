import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Link } from '@newrelic/gatsby-theme-newrelic';
import {
  SUPPORT_LINK,
  COMMUNITY_LINK,
  QUICKSTART_SUPPORT_LEVELS,
} from '@data/constants';

const SupportSection = ({ supportLevel, onClick: onLinkClick }) => {
  const supportLink = (
    <Link
      css={css`
        color: var(--link-font-color);

        &:hover {
          color: var(--hover-color);
        }
      `}
      to={SUPPORT_LINK}
      key={QUICKSTART_SUPPORT_LEVELS.NEWRELIC}
      onClick={() =>
        onLinkClick && onLinkClick('QuickstartDetailsSupportClick')
      }
    >
      Visit our Support Center
    </Link>
  );

  const communityLink = (
    <Link
      css={css`
        color: var(--link-font-color);

        &:hover {
          color: var(--hover-color);
        }
      `}
      to={COMMUNITY_LINK}
      key={QUICKSTART_SUPPORT_LEVELS.COMMUNITY}
      onClick={() => onLinkClick('QuickstartDetailsCommunityClick')}
    >
      the Explorers Hub
    </Link>
  );

  const QUICKSTART_SUPPORT_CONTENT = {
    [QUICKSTART_SUPPORT_LEVELS.NEWRELIC]: {
      title: 'Built by New Relic',
      content: (
        <p
          css={css`
            line-height: 28px;
          `}
        >
          Need help? {supportLink} or check out our community forum,{' '}
          {communityLink}.
        </p>
      ),
    },
    [QUICKSTART_SUPPORT_LEVELS.VERIFIED]: {
      title: 'Verified by New Relic',
      content: (
        <p>
          Need help? Find the author's support resources under{' '}
          <strong>What's included</strong>. Or check out our community forum,{' '}
          {communityLink}.
        </p>
      ),
    },
    [QUICKSTART_SUPPORT_LEVELS.COMMUNITY]: {
      title: 'Built by the community',
      content: (
        <p>
          Need help? Visit our community forum, {communityLink} to find an
          answer or post a question.
        </p>
      ),
    },
  };

  return (
    <>
      <div
        css={css`
          text-transform: uppercase;
          color: var(--link-font-color);
          font-size: 18px;
          font-family: 'Open Sans';
          font-weight: 700;
          line-height: 48px;
        `}
      >
        {QUICKSTART_SUPPORT_CONTENT[`${supportLevel}`].title}
      </div>
      {QUICKSTART_SUPPORT_CONTENT[`${supportLevel}`].content}
    </>
  );
};

SupportSection.propTypes = {
  supportLevel: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default SupportSection;
