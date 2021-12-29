import React, { useEffect, useState } from "react";
/////////////////////////////////////////
// IMPORTANT ///////////////////////////
// Check out useEffect comment. ///////
//////////////////////////////////////

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useHttp from "./hooks/use-http";

function App() {
  const [tasks, setTasks] = useState([]);

  const requestObject = {
    url: `https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json`,
  };

  const { isLoading, error, sendRequest: fetchTasks } = useHttp();

  // fetching tasks when the component is loaded.

  useEffect(() => {
    const transformTasks = (taskObj) => {
      const loadedTasks = [];

      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }

      setTasks(loadedTasks);
    };

    fetchTasks(requestObject, transformTasks);
    // In order to make use effect work proparly I put fetchTasks as a dependency.
    // This creates an infinit loop.
    // In order to avoid it I had to wrap sendRequest function inside use-http.js with useCallback() to store it in memory.
    // Then I shifted the (requestObject, transformTasks) args from useHttp() to the function useHttp returns -> fetchTasks.
    // Last I shifted transform task declaration inside the useEffect() in order to avoid making it an outside dependency and avoid useing useCallback extra time.
    // now the ony function object to store in memory will be sendRequest: fetchTasks inside use-http.js.
    // More lean code then in 15.2.1_custom_hooks_http project.
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
