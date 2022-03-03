import React from 'react';
import QuickStartLayout from './QuickStartLayout';
import PropTypes from 'prop-types';

const Layout = ({ children }) => <QuickStartLayout>{children}</QuickStartLayout>;

Layout.propTypes = {
  children: PropTypes.node,
  pageContext: PropTypes.object,
};

export default Layout;
