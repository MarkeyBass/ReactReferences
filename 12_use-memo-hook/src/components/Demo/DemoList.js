import React, { useMemo } from 'react';

import classes from './DemoList.module.css';

const DemoList = (props) => {
  const { items } = props;

  // useMemo stores the sortedList function to Reacts memory.
  // React doesnt have to recreate it on every Button click
  // useMemo is used for storing all kinds of data. 
  // we return the data we want to memoies and
  // useCallback is used for storing functional object and rebuilt it only is some input change. 

  const sortedList = useMemo(() => {
    console.log('Items sorted');
    return items.sort((a, b) => a - b);
  }, [items]); 
  
  // const sortedList = () => {
  //   console.log('Items sorted');
  //   return items.sort((a, b) => a - b);
  // }; 
  
  
  console.log('DemoList RUNNING');

  return (
    <div className={classes.list}>
      <h2>{props.title}</h2>
      <ul>
        {sortedList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(DemoList);
