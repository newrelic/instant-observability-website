import useTessen from '@newrelic/gatsby-theme-newrelic/src/hooks/useTessen';

const asFeaturedTile = QuickstartTile => ({ ...props }) => {
  const tessen = useTessen();

  return <QuickstartTile {...props} />
};

export default asFeaturedTile;
