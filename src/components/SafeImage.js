import React from 'react';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { css } from '@emotion/react';
import PropTypes from 'prop-types';

/**
 * Renders a `GatsbyImage` with an optional fallback to `img`
 * @param {Object} props
 * @param {Object} props.imageNode - a `childImageSharp` image node
 * @param {Object} props.rawNode - a raw image node, this will be used if `imageNode` is undefined
 * @param {String} props.alt - the alt tag for the image
 * @param {String} props.className - used to pass around `@emotion` css classes
 */
const SafeImage = ({ className, alt, imageNode, rawNode }) => {
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
          objectFit="contain"
          image={image}
          alt={alt}
        />
      );
    }
  }

  // If we don't have a sharp-capable image, but we have a URL, it's an
  // SVG (already performant) and is already built with the site.
  return (
    <img
      css={css`
        display: block;
        max-width: 100%;
        max-height: 100%;
      `}
      src={rawNode.publicURL}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

SafeImage.propTypes = {
  alt: PropTypes.string.isRequired,
  className: PropTypes.string,
  imageNode: PropTypes.object,
  rawNode: PropTypes.shape({ publicURL: PropTypes.string.isRequired }),
};

export default SafeImage;
