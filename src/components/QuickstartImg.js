import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
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

const QuickstartImg = ({ className, logoUrl, packName, imageNode }) => {
  const image = getImage(imageNode);

  // If we have an image for sharp to optimize, use GatsbyImage
  if (image) {
    return (
      <GatsbyImage
        css={css`
          display: block;
          max-width: 100%;
          max-height: 100%;
        `}
        className={className}
        image={image}
        alt={packName}
      />
    );
  }

  // if we don't have a sharp-capable image, but we have a URL, it's an
  // SVG (already performant).
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

  // If no images available, create a "placeholder" using the acronym
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
      <p>{acronym}</p>
    </div>
  );
};

QuickstartImg.propTypes = {
  packName: PropTypes.string.isRequired,
  logoUrl: PropTypes.string,
  className: PropTypes.string,
  imageNode: PropTypes.object,
};

export default QuickstartImg;
