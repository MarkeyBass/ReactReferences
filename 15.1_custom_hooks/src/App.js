import React from 'react';
// import BackwardCounter from './components/BackwardCounter';
// import ForwardCounter from './components/ForwardCounter';
import FlexibleCounter from './components/FlexibleCounter';

function App() {
  return (
    <React.Fragment>
      {/* <ForwardCounter />
      <BackwardCounter /> */}
      <FlexibleCounter countDirection={ 1 }/>
      <FlexibleCounter countDirection={ -1 }/>
    </React.Fragment>
  );
}

export default App;
