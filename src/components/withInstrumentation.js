import React from 'react';
import PropTypes from 'prop-types';
import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';

const withFeaturedInstrumentation = (QuickstartTile) => {
  const InstrumentedComponent = (props) => {
    const tessen = useTessen();
    const { name, index, category } = props;

    const customClickHandler = () => {
      tessen.track({
        eventName: 'instantObservability',
        category,
        quickstartName: name,
        index: index,
      });
    };

    return (
      <QuickstartTile {...props} customClickHandler={customClickHandler} />
    );
  };

  InstrumentedComponent.propTypes = {
    name: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
  };

  return InstrumentedComponent;
};

export default withFeaturedInstrumentation;
