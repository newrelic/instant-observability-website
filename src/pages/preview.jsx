import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { getQuickstartFilesFromPR, getQuickstartFilesFromLocal, getFileListFromLocal } from '../utils/preview/fetchHelpers';
import { navigate } from 'gatsby';

const PreviewPage = ({ location }) => {
  const [contentFiles, setContentFiles] = useState([]);

  // TODO: Make this into a custom hook to reduce useEffect usage
  useEffect(() => {
    // grab query parameters to determine if it is a local preview or
    // PR preview
    const urlParams = new URLSearchParams(location.search);
    const prNumber = urlParams.get('pr');
    const isLocal = urlParams.get('local');
    const port = urlParams.get('port') || 3000;
    const quickstartPath = urlParams.get('quickstart');

    // check to make sure query parameters are set
    // otherwise, return home
    if (!isLocal) {
        if (!prNumber || !quickstartPath) {
            navigate('/');
            return;
        }
    }
    
    /*
     * Async function to walk the file system in Github
     * and set the content to a stateful variable.
     **/
    const fetchRawFiles = async () => {
      let fileContent;
      if (isLocal) {
        const fileList = await getFileListFromLocal(port);

        fileContent = await getQuickstartFilesFromLocal(fileList, port);
      } else {
        fileContent = await getQuickstartFilesFromPR(
            prNumber,
            quickstartPath
        );
      }
      

      // Error handling in the chance Github returns
      // a non 200 status
      if (fileContent === null) {
        navigate('/');
        return;
      }
      setContentFiles(fileContent);
    };
    fetchRawFiles();
  }, []);

  // To console log the results as part of AC
  // TODO: Remove/refactor this in parsing implementation
  useEffect(() => {
    if (contentFiles.length < 1) {
      return;
    }

    console.log(contentFiles);
  }, [contentFiles]);

  return <span>oh hai</span>;
};

PreviewPage.propTypes = {
  location: PropTypes.object.isRequired,
};

export default PreviewPage;
