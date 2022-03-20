import { useState, useEffect, useCallback } from 'react';

const useButtonlListener = handleButtonPressFunction => {
  // adding the eventListener for pressing the button
  useEffect(() => {
    document.addEventListener('keydown', handleButtonPressFunction);
    document.addEventListener('keyup', handleButtonPressFunction);
    return () => {
      document.removeEventListener('keydown', handleButtonPressFunction);
      document.removeEventListener('keyup', handleButtonPressFunction);
    };
  }, [handleButtonPressFunction]);
};

export default useButtonlListener;

export const useEnterListener = () => {
  const [enterPressed, setEnterPressed] = useState(false);
  const handleEnterPressFunction = useCallback(e => {
    if (e.keyCode === 13) {
      if (e.type === 'keydown') {
        setEnterPressed(true);
      } else setEnterPressed(false);
    }
  }, []);
  useButtonlListener(handleEnterPressFunction);

  return enterPressed;
};
