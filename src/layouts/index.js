import React from "react";
import QuickStartLayout from "./QuickStartLayout";
import PropTypes from "prop-types";

const Layout = ({ children, pageContext }) => {
  if (pageContext.fileRelativePath.match(/404/)) {
    return children;
  }

  return <QuickStartLayout>{children}</QuickStartLayout>;
};

Layout.propTypes = {
  children: PropTypes.node,
  pageContext: PropTypes.object,
};

export default Layout;
