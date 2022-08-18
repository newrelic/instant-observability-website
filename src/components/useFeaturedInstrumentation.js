import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';

const useFeaturedInstrumentation = QuickstartTile => (props) => {
  const { name, index } = props;
  const tessen = useTessen();

  const customClickHandler = () => {
    tessen.track({
      eventName: 'instantObservability',
      category: 'FeaturedQuickstartClick',
      quickstartName: name,
      index
    });
  };

  return <QuickstartTile {...props} customClickHandler={customClickHandler} />
};

export default useFeaturedInstrumentation;
