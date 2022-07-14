import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Content from '@newrelic/gatsby-theme-newrelic/src/components/Layout/Content';
import Footer from '@newrelic/gatsby-theme-newrelic/src/components/Layout/Footer';
import Main from '@newrelic/gatsby-theme-newrelic/src/components/Layout/Main';
import PageTools from '@newrelic/gatsby-theme-newrelic/src/components/Layout/PageTools';
import Sidebar from '@newrelic/gatsby-theme-newrelic/src/components/Layout/Sidebar';

const Layout = ({ className, children }) => {
  return (
    <div
      className={className}
      css={css`
        --sidebar-width: 300px;

        display: grid;
        grid-template-columns: var(--sidebar-width) minmax(0, 1fr);
        grid-template-areas: 'sidebar main';
        grid-template-rows: 1fr auto;
        min-height: calc(100vh - var(--global-header-height));
        margin: 0 auto;
        max-width: var(--site-max-width);

        @media screen and (max-width: 760px) {
          grid-template-columns: minmax(0, 1fr);
          grid-template-areas: 'main';
          grid-template-rows: unset;
        }
      `}
    >
      {children}
    </div>
  );
};

Layout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
};

Layout.Content = Content;
Layout.Main = Main;
Layout.PageTools = PageTools;
Layout.Footer = Footer;
Layout.Sidebar = Sidebar;

export default Layout;
