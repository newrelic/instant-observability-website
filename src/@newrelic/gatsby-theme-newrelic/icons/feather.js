import React from 'react';
import defaultIcons from '@newrelic/gatsby-theme-newrelic/src/icons/feather';

const featherIcons = {
  ...defaultIcons,
  box: (
    <>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
      />
      <polyline
        xmlns="http://www.w3.org/2000/svg"
        points="3.27 6.96 12 12.01 20.73 6.96"
      />
      <line
        xmlns="http://www.w3.org/2000/svg"
        x1="12"
        y1="22.08"
        x2="12"
        y2="12"
      />
    </>
  ),
  checkCircle: (
    <>
      <path
        xmlns="http://www.w3.org/2000/svg"
        d="M22 11.08V12a10 10 0 1 1-5.93-9.14"
      />
      <polyline
        xmlns="http://www.w3.org/2000/svg"
        points="22 4 12 14.01 9 11.01"
      />
    </>
  ),
  'chevron-left': (
    <>
      <polyline points="15 18 9 12 15 6" />
    </>
  ),
  'chevron-right': (
    <>
      <polyline points="9 18 15 12 9 6" />
    </>
  ),
  'arrow-left': (
    <>
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </>
  ),
  'arrow-right': (
    <>
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </>
  ),
  circle: (
    <>
      <circle cx="12" cy="12" r="10" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  code: (
    <>
      <polyline points="16 18 22 12 16 6" />
      <polyline points="8 6 2 12 8 18" />
    </>
  ),
  eye: (
    <>
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'message-square': (
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  ),
  edit: (
    <>
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </>
  ),
  list: (
    <>
      <line x1="8" y1="6" x2="21" y2="6" />
      <line x1="8" y1="12" x2="21" y2="12" />
      <line x1="8" y1="18" x2="21" y2="18" />
      <line x1="3" y1="6" x2="3.01" y2="6" />
      <line x1="3" y1="12" x2="3.01" y2="12" />
      <line x1="3" y1="18" x2="3.01" y2="18" />
    </>
  ),
  twitter: (
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  ),
  zap: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  'carousel-left': (
    <>
      <path d="M0.500003 14.595C0.500004 22.2769 6.69521 28.5 14.332 28.5C21.9689 28.5 28.1641 22.2769 28.1641 14.595C28.1641 6.91304 21.9689 0.689942 14.332 0.689943C6.6952 0.689943 0.500002 6.91304 0.500003 14.595Z" />
      <rect
        width="1.26508"
        height="6.95795"
        fill="#00838f"
        transform="matrix(-0.705305 -0.708904 -0.705305 0.708905 16.8281 10.5571)"
      />
      <rect
        width="6.95788"
        height="1.26507"
        fill="#00838f"
        transform="matrix(-0.705312 -0.708897 -0.705312 0.708897 16.7637 18.6929)"
      />
    </>
  ),
  'carousel-right': (
    <>
      <path
        d="M28.1641 15.2484C28.1641 7.56649 21.9689 1.34338 14.332 1.34338C6.6952 1.34338 0.5 7.56649 0.5 15.2484C0.5 22.9304 6.6952 29.1535 14.332 29.1535C21.9689 29.1535 28.1641 22.9304 28.1641 15.2484Z"
      />
      <rect
        width="1.26507"
        height="6.95788"
        fill="#00838f"
        transform="matrix(0.705305 0.708905 0.705305 -0.708905 11.832 19.2863)"
      />
      <rect
        width="6.95788"
        height="1.26507"
        fill="#00838f"
        transform="matrix(0.705305 0.708905 0.705305 -0.708905 11.8955 11.1505)"
      />
    </>
  ),
};

export default featherIcons;
