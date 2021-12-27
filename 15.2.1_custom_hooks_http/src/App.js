import React, { useEffect, useState, useCallback, useMemo } from 'react';
/////////////////////////////////////////
// IMPORTANT ///////////////////////////
// Check out useEffect comment. ///////
//////////////////////////////////////

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/use-http'; 

function App() {
  const [tasks, setTasks] = useState([]);

  const requestObject = useMemo(() => {return { url: `https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json` }}, [])
  const transformTasks = useCallback((taskObj) => {
    
    const loadedTasks = [];

    for (const taskKey in taskObj) {
      loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
    }

    setTasks(loadedTasks);
  }, []);

  const {isLoading, error, sendRequest: fetchTasks} = useHttp(requestObject, transformTasks);
  
  // fetching tasks when the component is loaded.
  
  useEffect(() => {
    fetchTasks();
    // In order to make use effect work proparly I put fetch task as a dependency.
    // This creates an infinit loop.
    // In order to avoid it I had to wrap sendRequest function inside use-http.js wuth useCallback() to store it in memory.
    // Then I had to wrap the sendRequest dependencies in App.js: transformTasks with useCallback and requestObject with useMeme().
    // A lot of wrapping. Another solution will be putting requestObjevt and transformTasks as dependencies of fetchTasks.
    // Look at final solution in 15.2.2_custom_hooks_http project.
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
