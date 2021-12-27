
// useCallback hook helps us to stor function across component execution 
// so that it doesn't need to be re created with every execution.
// It saves the function in reacts internal storage and will reuse the same function.
import React, { useState, useCallback } from 'react';
import Button from './components/UI/Button/Button'
import DemoOutput from './components/Demo/DemoOutput';

import './App.css';

function App() {

  const [showParagraph, setShowParagraph] = useState(false);
  const [allowToggle, setAllowToggle] = useState(false);


  const toggleParagraphHandler = useCallback(() => {

    allowToggle && setShowParagraph(prevShowParagraph => !prevShowParagraph);
  // for useCallback a list of dependencies is needed - here we dont need anything
  // React will make sure that setShowParagraph will never change just like in useEffect.
  }, [allowToggle]);
  


  const allowToggleHandler = useCallback(() => {
    setAllowToggle(prevAllowToggle => !prevAllowToggle);
  }, []);



  console.log('App is runnig!')

  return (
   
    <div className="app">
      <h1>Hi there!</h1>
      <DemoOutput show={showParagraph}/>
      {/* <DemoOutput show={false}/> */}
      <Button onClick={allowToggleHandler}>Allow Toggling</Button>
      <p></p>
      <Button onClick={toggleParagraphHandler}>Click to toggle paragraph</Button>
    </div>
   
  );
}

export default App;
