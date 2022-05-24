import { useEffect, useState } from 'react';

import {
  getQuickstartFilesFromPR,
  getQuickstartFilesFromLocal,
} from '../utils/preview/fetchHelpers';
import { parseRawQuickstartFiles } from '../utils/preview/parseHelpers';
import { navigate } from 'gatsby';

const useQuickstartPreview = (isLocal, port, prNumber, quickstartPath) => {
  const [quickstart, setQuickstart] = useState();

  useEffect(() => {
    // ensure the prNumber and quickstartPath are set if
    // quickstart preview is not local
    
    if (!isLocal && (!prNumber || !quickstartPath)) {
      navigate('/');
      return
    }

    /**
     * Async function to check if there is a server connection
     * to localhost if isLocal is set to true
     */
    const checkServer = async () => {
      try {
        await fetch(`http://localhost:${port}`);
      } catch (error) {
        console.log(err.message);
        console.log('Please make sure your local preview server is running.');
        navigate('/');
      }
    };
    /*
     * Async function to walk the file system in Github
     * and set the content to a stateful variable.
     **/
    const fetchFiles = async () => {
      try {
        const rawFileContent = isLocal
          ? await getQuickstartFilesFromLocal(port)
          : await getQuickstartFilesFromPR(prNumber, quickstartPath);

        const parsedQuickstart = parseRawQuickstartFiles(rawFileContent);
        setQuickstart(parsedQuickstart);
      } catch (error) {
        console.log('Error:', error.message);
        navigate('/');
        return;
      }
    };

    if (isLocal) {
      checkServer();
    }
    fetchFiles();
  }, []);

  return quickstart;
};

export default useQuickstartPreview;
