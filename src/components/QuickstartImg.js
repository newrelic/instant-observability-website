import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import DEFAULT_IMAGE from '../images/default-logo-background.svg';

/**
 * Given a quickstart name, this will return the acronym.
 *
 * @example getNameAcronym("New Relic Java Agent"); // "NRJA"
 *
 * @param {string} name
 * @returns {string}
 */
const getNameAcronym = (name) =>
  name
    .split(' ')
    .map((word) => word.charAt(0))
    .join('');

  const getPackNameAcronym = () => {
    let packNameAcronym = '';
    packName.split(' ').forEach((word) => {
      packNameAcronym = packNameAcronym.concat('', word.charAt(0));
    });
    setPackAcronym(packNameAcronym.toUpperCase());
  };
  useEffect(() => {
    if (!logoUrl) {
      getPackNameAcronym();
    }
  });

  if (logoUrl) {
    return (
      <img
        css={css`
          display: block;
          max-width: 100%;
          max-height: 100%;
        `}
        src={logoUrl}
        alt={packName}
        onError={(e) => {
          e.preventDefault();
          e.target.src = DEFAULT_IMAGE;
        }}
        className={className}
      />
    );
  }

  // If no image available, create a "placeholder" using the acronym
  // for the quickstart name.
  const acronym = getNameAcronym(packName);

  return (
    <div
      className={className}
      css={css`
        color: var(--color-brand-400);
        font-family: var(--code-font);
        font-size: ${acronym.length < 4 ? '4rem' : '2rem'};
        background-image: url(${DEFAULT_IMAGE});
        background-repeat: no-repeat;
        background-position: center;
        background-origin: content-box;
        display: flex;
        justify-content: center;
        align-items: center;
      `}
    >
      <p>{packAcronym}</p>
    </div>
  );
};

QuickstartImg.propTypes = {
  packName: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
  className: PropTypes.string,
};

export default QuickstartImg;
