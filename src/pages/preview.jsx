import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';
import { getQuickstartFilesFromPR } from '../utils/preview/fetchHelpers';
import { navigate } from 'gatsby';

const PreviewPage = ({ location }) => {
  const [contentFiles, setContentFiles] = useState([]);

  // TODO: Make this into a custom hook to reduce useEffect usage
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
    const fetchRawFiles = async () => {
      try {
        const fileContent = await getQuickstartFilesFromPR(
          prNumber,
          quickstartPath
        );
        setContentFiles(fileContent);
      } catch (error) {
        console.log('Error:', error.message);
        navigate('/');
        return;
      }
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
