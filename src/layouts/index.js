import React from 'react';
import QuickStartLayout from './QuickStartLayout';
import PropTypes from 'prop-types';
import GlobalStyles from '@components/GlobalStyles';

const Layout = ({ children, pageContext }) => {
  if (pageContext.layout === 'QuickStartLayout') {
    return (
      <QuickStartLayout>
        <GlobalStyles>{children}</GlobalStyles>
      </QuickStartLayout>
    );
  }

  return (
    <div>
      <GlobalStyles>{children}</GlobalStyles>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node,
  pageContext: PropTypes.object,
};

export default Layout;
