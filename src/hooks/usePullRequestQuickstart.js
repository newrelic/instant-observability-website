import { useEffect, useState } from 'react';

import { getQuickstartFilesFromPR } from '../utils/preview/fetchHelpers';
import { parseQuickstartFilesFromPR } from '../utils/preview/parseHelpers';
import { navigate } from 'gatsby';

const usePullRequestQuickstart = (location) => {
  const [quickstart, setQuickstart] = useState([]);

  useEffect(() => {
    // grab query parameters to determine if it is a local preview or
    // PR preview
    const urlParams = new URLSearchParams(location.search);
    const prNumber = urlParams.get('pr');
    const quickstartPath = urlParams.get('quickstart');

    // check to make sure query parameters are set
    // otherwise, return home
    if (!prNumber || !quickstartPath) {
      navigate('/');
      return;
    }

    /*
     * Async function to walk the file system in Github
     * and set the content to a stateful variable.
     **/
    const fetchFiles = async () => {
      try {
        const rawFileContent = await getQuickstartFilesFromPR(
          prNumber,
          quickstartPath
        );

        // Error handling in the chance Github returns
        // a non 200 status
        if (rawFileContent === null) {
          navigate('/');
          return;
        }

        const parsedQuickstart = await parseQuickstartFilesFromPR(
          rawFileContent
        );

        setQuickstart(parsedQuickstart);
      } catch (error) {
        console.log('Error:', error.message);
        navigate('/');
        return;
      }
    };

    fetchFiles();
  }, []);
  return quickstart;
};

export default usePullRequestQuickstart;
