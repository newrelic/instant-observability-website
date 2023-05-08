import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { graphql } from 'gatsby';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import Link from '@newrelic/gatsby-theme-newrelic/src/components/Link';
import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';
import { useLoggedIn } from '@newrelic/gatsby-theme-newrelic/src/hooks/useLoggedIn';
import isNRPartner from '@utils/isNRPartner';

import {
  getPackNr1Url,
  getGuidedInstallStackedNr1Url,
} from '@utils/get-pack-nr1-url';
import {
  NR1_GUIDED_INSTALL_NERDLET,
  NR1_PACK_DETAILS_NERDLET,
  NR1_CODESTREAM_INSTALL_NERDLET,
  CODESTREAM_QUICKSTART_ID,
  UTM_PARAMETERS,
  SIGNUP_LINK,
} from '@data/constants';
import { quickstart } from '../types';
import Cookies from 'js-cookie';
import useTreatment from '@hooks/useTreatment';
/**
 * @param {Object} parameters
 * @returns {Boolean}
 */
const checkUtmParameters = (parameters) => {
  if (!parameters) {
    return false;
  }

  const hasUtmParameters = Object.entries(UTM_PARAMETERS).some(
    ([key, value]) => {
      return parameters.get(key) === value;
    }
  );

  return hasUtmParameters;
};

/**
 * @param {String} id
 * @param {String} nerdletId
 * @param {Boolean} hasGuidedInstall
 * @param {Boolean} hasUtmParameters
 * @param {String} parameters
 * @returns {String}
 */
const createInstallLink = (
  id,
  nerdletId,
  hasGuidedInstall,
  hasUtmParameters,
  isLoggedIn,
  parameters
) => {
  const platformUrl = hasGuidedInstall
    ? getGuidedInstallStackedNr1Url(nerdletId)
    : getPackNr1Url(id, nerdletId);

  const installUrl = new URL(isLoggedIn ? platformUrl : SIGNUP_LINK);
  if (parameters) {
    parameters.forEach((value, key) => {
      installUrl.searchParams.set(key, value);
    });
  }

  if (hasUtmParameters) {
    installUrl.searchParams.set('return_to', platformUrl);
  }
  return installUrl.href;
};

/**
 * @param {quickstart} quickstart
 * @param {String} key
 * @returns {Boolean}
 */
const hasComponent = (quickstart, key) =>
  quickstart[key] && quickstart[key].length > 0;

const InstallButton = ({
  quickstart,
  location,
  buttonStyle = 'PRIMARY',
  ...props
}) => {
  const { treatment } = useTreatment('super_tiles');
  const { loggedIn } = useLoggedIn();

  const hasInstallableComponent =
    hasComponent(quickstart, 'installPlans') ||
    hasComponent(quickstart, 'dataSources') ||
    quickstart.id === CODESTREAM_QUICKSTART_ID;

  const tessen = useTessen();

  const parameters = new URLSearchParams(location.search);

  const hasGuidedInstall =
    hasInstallableComponent &&
    quickstart.installPlans.length === 1 &&
    quickstart.installPlans[0].id.includes('guided-install');

  // If there is nothing to install AND no documentation, don't show this button.
  if (!hasInstallableComponent && !hasComponent(quickstart, 'documentation')) {
    return null;
  }

  let nerdletId = hasGuidedInstall
    ? NR1_GUIDED_INSTALL_NERDLET
    : NR1_PACK_DETAILS_NERDLET;

  if (quickstart.id === CODESTREAM_QUICKSTART_ID) {
    nerdletId = NR1_CODESTREAM_INSTALL_NERDLET;
  }
  const hasUtmParameters = checkUtmParameters(parameters);
  // If we have an install-able component, generate a URL. Otherwise, link to the
  // first documentation supplied.
  const installUrl = hasInstallableComponent
    ? createInstallLink(
        quickstart.id,
        nerdletId,
        hasGuidedInstall,
        hasUtmParameters,
        loggedIn,
        parameters
      )
    : quickstart.documentation[0].url;

  const writeCookie = () => {
    const currentEnvironment =
      process.env.ENV || process.env.NODE_ENV || 'development';
    const options = { expires: 1 /* days */ };
    if (currentEnvironment !== 'development') {
      options.domain = 'newrelic.com';
    }

    const startTarget = btoa(
      JSON.stringify({
        source: 'nrio',
        id: quickstart.id,
      })
    );
    Cookies.set('start_target', startTarget, options);
    Cookies.set('newrelic-quickstart-id', quickstart.id, options);
  };

  const handleInstallClick = () => {
    writeCookie();
    tessen.track({
      eventName: 'instantObservability',
      category: 'QuickstartInstall',
      quickstartName: quickstart.name,
      quickstartId: quickstart.id,
      quickstartUrl: quickstart.packUrl,
      super_tiles_treatment: treatment,
      urlParameters: parameters ? Object.entries([...parameters]) : null,
      partner: isNRPartner(quickstart.keywords),
      quickstartButtonText: hasInstallableComponent
        ? 'Install quickstart'
        : 'See installation docs',
    });
  };

  return (
    <Button
      {...props}
      as={Link}
      to={installUrl}
      onClick={handleInstallClick}
      variant={
        buttonStyle === 'PRIMARY'
          ? Button.VARIANT.PRIMARY
          : Button.VARIANT.NORMAL
      }
      className="btn-styles btn1"
      css={css`
        border-radius: 4px;
        font-size: 14px;
        line-height: 21px;
        font-weight: 400;
        padding: 1rem;

        ${hasInstallableComponent &&
        css`
          padding: 0;
          width: 106px;
          height: 3.125rem;
        `};
      `}
    >
      {hasInstallableComponent ? (
        <div className="btn-animation-styles">
          <div className="scroll scroll-top">Install now</div>
          <div className="scroll scroll-bottom">Install now</div>
        </div>
      ) : (
        'See installation docs'
      )}
    </Button>
  );
};

InstallButton.propTypes = {
  quickstart: quickstart.isRequired,
  onClick: PropTypes.func,
  location: PropTypes.object.isRequired,
  buttonStyle: PropTypes.oneOf(['PRIMARY', 'SECONDARY']),
};

export const fragmentQuery = graphql`
  fragment InstallButton_quickstart on Quickstarts {
    installPlans {
      id
      name
    }
    dataSources {
      id
      name
    }
    documentation {
      name
      url
      description
    }
  }
`;

export default InstallButton;
