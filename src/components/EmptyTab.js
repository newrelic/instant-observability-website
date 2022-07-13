import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Button, Icon, Link } from '@newrelic/gatsby-theme-newrelic';
import { QUICKSTARTS_REPO } from '@data/constants';
import GitHubIconSVG from './Icons/GitHubIconSVG';

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
        height: 3rem;
      `}
    >
      <Button
        css={css`
          border-radius: 4px;
          padding: 0px 20px 0px 22px;
          column-gap: 14.45px;
          @media (max-width: 760px) {
            width: 100%;
          }
          .btn-animation-styles {
            padding-top: 0.188rem;
          }
          .scroll {
            margin-bottom: 0.125rem;
          }
          .btn-text {
            float: right;
            margin-left: 0.938rem;
            padding-top: 0.125rem;
            height: 1.25rem;
          }
        `}
        as={Link}
        variant={Button.VARIANT.NORMAL}
        to={quickstartUrl}
        rel="noopener noreferrer"
        instrumentation={{ quickstartName }}
        className="btn-styles btn1"
      >
        <div className="btn-animation-styles">
          <div className="scroll scroll-top">
            <GitHubIconSVG />
            <div className="btn-text">View repo</div>
          </div>
          <div className="scroll scroll-bottom">
            <GitHubIconSVG />
            <div className="btn-text">View repo</div>
          </div>
        </div>
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
