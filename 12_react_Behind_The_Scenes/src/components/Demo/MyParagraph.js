import React from 'react';

const MyParagraph = props => {

  console.log('MyParagraph is runnig!')

  return <p>{props.children}</p>
}


export default MyParagraph;