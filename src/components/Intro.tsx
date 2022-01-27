import React from 'react';
import { css } from '@emotion/react';
import SideBySide from './SideBySide';
import PropTypes from 'prop-types';

const Intro = ({ className, children, type = 'Video' }: IntroProps) => (
  <SideBySide
    type={type}
    className={className}
    css={css`
      color: var(--secondary-text-color);
      font-size: 1.125rem;
      line-height: 1.75;

      li:not(:last-child) {
        margin-bottom: 0.5rem !important;
      }
    `}
  >
    {children}
  </SideBySide>
);

interface IntroProps {
  className: string;
  children: React.ReactNode;
  type: SupportedTypes | SupportedTypes[];
}

// Only video or code is supported at the moment
type SupportedTypes = 'Video' | 'pre';

export default Intro;
