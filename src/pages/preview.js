import PropTypes from 'prop-types';
import useQueryParameter from '../hooks/useQueryParameter';

const PreviewPage = ({ location }) => {
  const prNumber = useQueryParameter('pr', location);
  const quickstartPath = useQueryParameter('quickstart', location);

  console.log(prNumber);
  console.log(quickstartPath);
  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
