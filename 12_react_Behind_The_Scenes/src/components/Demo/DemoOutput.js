import React from "react";
import MyParagraph from "./MyParagraph";


const DemoOutput = props => {
  
  console.log('DemoOtput is running!')
  
  return <MyParagraph>{props.show ? 'This is something new!' : <span style={{color: 'white'}}>.</span>}</MyParagraph>

}

// export default DemoOutput;
// React.memo will prevent he component from rerunning if it's props didn't chang.
// Good for large projects where we want to cut an antire brunch of child components from being reevaluated.
export default React.memo(DemoOutput);