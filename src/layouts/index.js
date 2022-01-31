import React from 'react';
import QuickStartLayout from './QuickStartLayout';
import PropTypes from 'prop-types';

const Layout = ({ children, pageContext }) => {
  if (pageContext.layout === 'QuickStartLayout') {
    return <QuickStartLayout>{children}</QuickStartLayout>;
  }

  return <>{children}</>;
};

Layout.propTypes = {
  children: PropTypes.node,
  pageContext: PropTypes.object,
};

export default Layout;
