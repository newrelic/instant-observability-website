import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';

const useMostPopularInstrumentation = QuickstartTile => (props) => {
  const { name, index } = props;
  const tessen = useTessen();

  const customClickHandler = () => {
    tessen.track({
      eventName: 'instantObservability',
      category: 'MostPopularQuickstartClick',
      quickstartName: name,
      index
    });
  };

  return <QuickstartTile {...props} customClickHandler={customClickHandler} />
};

export default useMostPopularInstrumentation;
