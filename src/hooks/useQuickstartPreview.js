import { useEffect, useState } from 'react';
import { navigate } from 'gatsby';
import { useTessen } from '@newrelic/gatsby-theme-newrelic';

import {
  getQuickstartFilesFromPR,
  getQuickstartFilesFromLocal,
} from '@utils/preview/fetchHelpers';
import { parseRawQuickstartFiles } from '@utils/preview/parseHelpers';

const useQuickstartPreview = (prNumber, quickstartPath, isLocal, port) => {
  const [quickstart, setQuickstart] = useState();
  const tessen = useTessen();

  useEffect(() => {
    // Send event before any `navigate` calls
    tessen.track({
      eventName: 'viewPreview',
      category: 'QuickstartPreview',
      isLocal,
      prNumber,
      quickstartPath,
    });

    // ensure the prNumber and quickstartPath are set if
    // quickstart preview is not local
    if (!isLocal && (!prNumber || !quickstartPath)) {
      navigate('/');
      return;
    }

    /*
     * Async function to walk the file system in Github
     * and set the content to a stateful variable.
     **/
    const fetchFiles = async () => {
      try {
        if (isLocal) {
          const isRunning = await isPreviewServerRunning(port);
          if (!isRunning) {
            throw new Error('Local preview server is not running');
          }
        }

        const rawFileContent = isLocal
          ? await getQuickstartFilesFromLocal(port)
          : await getQuickstartFilesFromPR(prNumber, quickstartPath);

        const parsedQuickstart = parseRawQuickstartFiles(rawFileContent);
        setQuickstart(parsedQuickstart);
      } catch (error) {
        tessen.track({
          eventName: 'fetchAndParseError',
          category: 'QuickstartPreview',
          prNumber,
          quickstartPath,
          isLocal,
          error: error.message,
        });

        console.log('Error:', error.message); // eslint-disable-line no-console
        navigate('/');
      }
    };

    fetchFiles();
  }, []);

  return quickstart;
};

/**
 * Async function to check if there is a server connection
 * to localhost if isLocal is set to true
 * @param {string} port - the port the local server is running on
 * @returns {Promise<boolean>}
 */
const isPreviewServerRunning = async (port) => {
  try {
    await fetch(`http://localhost:${port}`);
  } catch (error) {
    console.log(error.message); // eslint-disable-line no-console
    console.log('Please make sure your local preview server is running.'); // eslint-disable-line no-console
    // navigate to /
    return false;
  }

  return true;
};

export default useQuickstartPreview;
