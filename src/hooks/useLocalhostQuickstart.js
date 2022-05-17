import { useEffect, useState } from 'react';

import { getQuickstartFilesFromLocal } from '../utils/preview/fetchHelpers';
import { parseQuickstartFiles } from '../utils/preview/parseHelpers';
import { navigate } from 'gatsby';

const usePullRequestQuickstart = (location) => {
  const [contentFiles, setContentFiles] = useState([]);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const port = urlParams.get('port') || 3000;

    /*
     * Async function to get quickstart files from local
     * and set to state variable
     **/
    const fetchFiles = async () => {
      const rawFileContent = await getQuickstartFilesFromLocal(port);

      // Error handling in the chance Github returns
      // a non 200 status
      if (rawFileContent === null) {
        navigate('/');
        return;
      }

      const quickstart = await parseQuickstartFiles(rawFileContent);

      setContentFiles(quickstart);
    };

    fetchFiles();
  }, []);
  
  return contentFiles;
};

export default usePullRequestQuickstart;
