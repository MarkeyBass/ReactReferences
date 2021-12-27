import useHttp from "../../hooks/use-http";

import Section from "../UI/Section";
import TaskForm from "./TaskForm";

const NewTask = (props) => {
  const { isLoading, error, sendRequest: postTaskRequest } = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };

    props.onAddTask(createdTask)
  }

  const enterTaskHandler = async (taskText) => {

    const requestObject = {
      url: "https://movie-base-3cbc2-default-rtdb.europe-west1.firebasedatabase.app/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: {
        "Content-Type": "application/json",
      },
    };
    /////////////////////////////////////////////////////////////////////////////
    // // IN ORDER TO AVOId NESTED FUNCTION I TOOK THIS FUNC TO OUTER SCOPE  ///
    // // AND RECONFIGURED IT (ADDED EXTRA ARGUMENT WITH THE BIND KEYWORD)  /// 
    // //                                                                  ///
    // // IT IS BETTER FOR PREFORMANCE BUT LOOKS LESS READBLE             ///
    ////////////////////////////////////////////////////////////////////////
    // const createTask = (taskData) => {
    //   const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    //   const createdTask = { id: generatedId, text: taskText };
  
    //   props.onAddTask(createdTask)
    // }
    //                             the bind method preconfigures the function. 1st arg is for the this keyword, 2nd arg will be the first parameter reconfugured for the createTask method.
    //                             any other arguments from use-http applyDataCallback will be appended to the ent of the parameter list. (That is how bind() works in js)
    postTaskRequest(requestObject, createTask.bind(null, taskText));
  };
  
  return (
    <Section>
      <TaskForm
        onEnterTask={enterTaskHandler}
        loading={isLoading}
        hasError={error ? true : false}
        />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

