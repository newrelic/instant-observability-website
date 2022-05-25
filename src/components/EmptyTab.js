import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Button, Icon, Link } from '@newrelic/gatsby-theme-newrelic';
import { QUICKSTARTS_REPO } from '../data/constants';
import GitHubIconSVG from '../components/Icons/GitHubIconSVG';
import AnimatedText from './AnimatedText';

const EmptyTab = ({
  quickstartName,
  tabName,
  quickstartUrl = QUICKSTARTS_REPO,
}) => (
  <div
    css={css`
      border: 1px solid var(--divider-color);
      border-radius: 0.25rem;
      padding: 1rem;
      text-align: left;
    `}
  >
    <Icon
      css={css`
        display: block;
        margin: 15px 0px;
        font-size: 4rem;
        color: var(--divider-color);
      `}
      name="edit"
    />
    <p>
      This quickstart doesn't include any {tabName}. Do you think it should?
      <br />
      You can edit this quickstart to add helpful components. View the
      repository and open a pull request.
    </p>
    <div
      css={css`
        display: flex;
        justify-content: left;
      `}
    >
      <Button
        css={css`
          --button-background: var(--brand-secondary-background-color);
          --button-text-color: var(--brand-secondary-text-color);
          background-color: var(--button-background);
          border-radius: 4px;
          color: var(--button-text-color);
          background: var(--background-color);
          color: var(--btn-text-color);
          border-radius: 4px;
          font-weight: 400;
          padding: 0px 6px 0px 20px;
          &:hover {
            background-color: var(--button-background);
            color: var(--button-text-color);
          }

          @media (max-width: 760px) {
            width: 100%;
          }
        `}
        as={Link}
        variant={Button.VARIANT.PRIMARY}
        to={quickstartUrl}
        rel="noopener noreferrer"
        instrumentation={{ quickstartName }}
      >
        <GitHubIconSVG className="ViewRepo" />
        <AnimatedText text={'View repo'} />
      </Button>
    </div>
  </div>
);

EmptyTab.propTypes = {
  quickstartName: PropTypes.string.isRequired,
  tabName: PropTypes.string.isRequired,
  quickstartUrl: PropTypes.string,
};

export default EmptyTab;
