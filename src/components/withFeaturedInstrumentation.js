import React from 'react';
import PropTypes from 'prop-types';
import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';

const withFeaturedInstrumentation = (QuickstartTile) => {
  const WrappedComponent = (props) => {
    const tessen = useTessen();
    const { name, index } = props;

    const customClickHandler = () => {
      tessen.track({
        eventName: 'instantObservability',
        category: 'FeaturedQuickstartClick',
        quickstartName: name,
        index: index,
      });
    };

    return (
      <QuickstartTile {...props} customClickHandler={customClickHandler} />
    );
  };

  WrappedComponent.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  return WrappedComponent;
};

export default withFeaturedInstrumentation;
