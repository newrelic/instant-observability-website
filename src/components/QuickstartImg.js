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

/**
 * Displays the Quickstart name as a acronym with a subtle background.
 */
const FallbackImg = ({ className, name }) => {
  const acronym = getNameAcronym(name);

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

FallbackImg.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string,
};

const QuickstartImg = ({ className, packName, imageNode, svgNode }) => {
  if (imageNode) {
    // If we have an image for sharp to optimize, use GatsbyImage
    const image = getImage(imageNode);

    if (image) {
      return (
        <GatsbyImage
          css={css`
            display: block;
            max-width: 100%;
            max-height: 100%;
          `}
          className={className}
          imgStyle={{ 'object-fit': 'contain' }}
          image={image}
          alt={packName}
        />
      );
    }
  }

  // If we don't have a sharp-capable image, but we have a URL, it's an
  // SVG (already performant) and is already built with the site.
  if (svgNode) {
    return (
      <img
        css={css`
          display: block;
          max-width: 100%;
          max-height: 100%;
        `}
        src={svgNode.publicURL}
        alt={packName}
        className={className}
      />
    );
  }

  // In all other cases, render the fallback.
  return <FallbackImg className={className} name={packName} />;
};

QuickstartImg.propTypes = {
  packName: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageNode: PropTypes.object,
  svgNode: PropTypes.object,
};

export default QuickstartImg;
