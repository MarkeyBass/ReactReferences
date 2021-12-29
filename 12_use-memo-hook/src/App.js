import React, { useState, useCallback, useMemo } from "react";

import "./App.css";
import DemoList from "./components/Demo/DemoList";
import Button from "./components/UI/Button/Button";

function App() {
  const [listTitle, setListTitle] = useState("First List Title");

  // const changeTitleHandler = () => {
  //   setListTitle('Second List Title');
  // };

  const changeTitleHandler = useCallback(() => {
    listTitle === "First List Title"
      ? setListTitle("Second List Title")
      : setListTitle("First List Title");
  }, [listTitle]);

  // if the data in useMemo never changes we will put an empy array of dependencies to it's second argument.
  const listItems = useMemo(() => [5, 3, 1, 10, 9], []);

  return (
    <div className="app">
      <DemoList title={listTitle} items={listItems} />
      <Button onClick={changeTitleHandler}>Change List Title</Button>
    </div>
  );
}

export default App;
