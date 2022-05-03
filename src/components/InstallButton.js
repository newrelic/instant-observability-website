import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Button, Link, Icon, useTessen } from '@newrelic/gatsby-theme-newrelic';
import {
  getPackNr1Url,
  getGuidedInstallStackedNr1Url,
} from '../utils/get-pack-nr1-url';
import {
  NR1_GUIDED_INSTALL_NERDLET,
  NR1_PACK_DETAILS_NERDLET,
  NR1_CODESTREAM_INSTALL_NERDLET,
  CODESTREAM_QUICKSTART_ID,
  UTM_PARAMETERS,
  SIGNUP_LINK,
} from '../data/constants';
import { quickstart } from '../types';
import Cookies from 'js-cookie';
import useTreatment from '../hooks/useTreatment';

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
 * Method which returns `false` if current user is 'new'. Returns `true` if user is a returning user.
 * @returns {Boolean}
 */
const checkIfReturningUser = () => {
  return Boolean(Cookies.get('ajs_user_id'));
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
  isReturningUser,
  parameters
) => {
  const platformUrl = hasGuidedInstall
    ? getGuidedInstallStackedNr1Url(nerdletId)
    : getPackNr1Url(id, nerdletId);

  const installUrl = new URL(isReturningUser ? platformUrl : SIGNUP_LINK);
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

const InstallButton = ({ quickstart, location, ...props }) => {
  const { treatment } = useTreatment('super_tiles');

  const hasInstallableComponent =
    hasComponent(quickstart, 'installPlans') ||
    quickstart.id === CODESTREAM_QUICKSTART_ID;

  const tessen = useTessen();

  const [parameters, setParameters] = useState();
  useEffect(() => {
    if (location.search) {
      setParameters(new URLSearchParams(location.search));
    }
  }, [location.search, setParameters]);

  const hasGuidedInstall =
    hasInstallableComponent &&
    quickstart.installPlans.length === 1 &&
    quickstart.installPlans[0].id.includes('guided-install');

  const [installUrl, setInstallUrl] = useState(SIGNUP_LINK);
  useEffect(() => {
    setInstallUrl(url);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
  const url = hasInstallableComponent
    ? createInstallLink(
        quickstart.id,
        nerdletId,
        hasGuidedInstall,
        hasUtmParameters,
        checkIfReturningUser(),
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
      quickstartButtonText: hasInstallableComponent
        ? 'Install quickstart'
        : 'See installation docs',
    });
  };

  const InstallAnimationStyles = () => {
    return (
      <div
        css={css`
          overflow: hidden;
          line-height: 30px;
          text-align: center;
          width: 106px;
          height: 48px;
          margin: 0;

          > div {
            margin: 10px auto 0;
            white-space: nowrap;
          }

          .scroll {
            -webkit-animation: scroll-back 0.2s
              cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            animation: scroll-back 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)
              forwards;
          }
          &:hover .scroll {
            -webkit-animation: scroll 0.2s
              cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
            animation: scroll 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)
              forwards;
          }

          @-webkit-keyframes scroll {
            0% {
              -webkit-transform: translateY(0);
              transform: translateY(0);
            }
            100% {
              -webkit-transform: translateY(-40px);
              transform: translateY(-40px);
            }
          }
          @-webkit-keyframes scroll-back {
            0% {
              -webkit-transform: translateY(-40px);
              transform: translateY(-40px);
            }
            100% {
              -webkit-transform: translateY(0);
              transform: translateY(0);
            }
          }

          @keyframes scroll {
            0% {
              -webkit-transform: translateY(0);
              transform: translateY(0);
            }
            100% {
              -webkit-transform: translateY(-40px);
              transform: translateY(-40px);
            }
          }
          @keyframes scroll-back {
            0% {
              -webkit-transform: translateY(-40px);
              transform: translateY(-40px);
            }
            100% {
              -webkit-transform: translateY(0);
              transform: translateY(0);
            }
          }
        `}
      >
        <div class="scroll scroll-top">Install now</div>
        <div class="scroll scroll-bottom">Install now</div>
      </div>
    );
  };
  return (
    <Button
      {...props}
      as={Link}
      to={installUrl}
      onClick={handleInstallClick}
      variant={Button.VARIANT.PRIMARY}
      css={css`
        border-radius: 4px;
        padding: 1rem;
        background-color: #1d252c;
        font-family: 'Söhne-Leicht';
        font-size: 14px;
        font-weight: 400;

        &:hover {
          background-color: #1d252c;
        }
        ${hasInstallableComponent &&
        css`
          padding: 0;
          width: 106px;
        `};
      `}
    >
      {hasInstallableComponent ? (
        <InstallAnimationStyles />
      ) : (
        'See installation docs'
      )}
    </Button>
  );
};

InstallButton.propTypes = {
  quickstart: quickstart.isRequired,
  onClick: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
};

export default InstallButton;
