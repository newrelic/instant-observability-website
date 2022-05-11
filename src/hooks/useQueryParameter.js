import { useEffect, useState } from 'react';

/**
 * A hook to grab query parameters off of the current URL
 * @param {string} parameterKey - The key for the query parameter
 * @param {object} location - The Gatsby location object
 * @returns {string|null} The string value of the parameter or null if it does not exist
 */
const useQueryParameter = (parameterKey, location) => {
  const [param, setParam] = useState(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    setParam(urlParams.get(parameterKey));
  }, [parameterKey, location]);

  return param;
};

export default useQueryParameter;
