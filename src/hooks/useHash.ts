import {useEffect, useState, useCallback} from 'react';

const useHash = () => {
  const [hash, setHash] = useState(typeof window !== 'undefined' ? window.location.hash : '');

  const hashChangeHandler = useCallback(() => {
    setHash(window.location.hash);
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', hashChangeHandler);
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler);
    };
  }, []);

  return {hash, setHash};
};

export default useHash;