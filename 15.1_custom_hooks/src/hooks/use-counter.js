import { useState, useEffect } from 'react';

const useCounter = (directionOfCounting = 1) => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => prevCounter + directionOfCounting);
    }, 1000);

    return () => clearInterval(interval);
  }, [directionOfCounting]);

  return counter;
}



export default useCounter;