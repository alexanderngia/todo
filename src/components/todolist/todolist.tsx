import React, { ChangeEvent, FormEvent, useState } from "react";
import { useEffect } from "react";
import styles from "./todolist.module.scss";
import remove from "../../assets/image/close.svg";
// import edit from "../../assets/image/edit.svg";
interface TodolistProps {}
interface IJob {
  id: number;
  jobName: string;
}
const TODO_APP_STORAGE_KEY = "TODO_APP";
const Todolist: React.FC<TodolistProps> = (todo, props) => {
  const [input, setInput] = useState<string>("");
  const [job, setJob] = useState<IJob[]>([]);
  useEffect(() => {
    const storageJob = localStorage.getItem(TODO_APP_STORAGE_KEY);
    if (storageJob) {
      setJob(JSON.parse(storageJob));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(job));
  }, [job]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
    console.log(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setInput("");
  };
  const addTodo = (): void => {
    const newJob = {
      id: Math.floor(Math.random() * 10000),
      jobName: input,
    };
    // const editedJob = {
    //   id: newJob.id,
    //   jobName: input,
    // };
    console.log(newJob.id);
    setJob([...job, newJob]);
  };

  // const editJob = (editJob: string): void => {
  //   setInput(editJob);
  // };

  const completeJob = (removeJob: string): void => {
    setJob(
      job.filter((todo) => {
        return todo.jobName !== removeJob;
      })
    );
  };

  return (
    <div className={styles["root"]}>
      <h1 className={styles["title"]}>What the Plan for Today?</h1>
      <form
        onSubmit={handleSubmit}
        className={styles["container"]}
        autoComplete="off"
      >
        <input
          placeholder="Add Job"
          className={styles["input"]}
          type="text"
          value={input}
          name="text"
          onChange={handleChange}
          required
        />
        <button onClick={addTodo} className={styles["btn"]}>
          Add Task
        </button>
      </form>
      <ul className={styles["todos"]}>
        {job.map((jobs, index) => {
          return (
            <li key={index}>
              {jobs.jobName}
              <div className={styles["job-edit"]}>
                {/* <img src={edit} alt="edit" /> */}
                <img
                  onClick={() => completeJob(jobs.jobName)}
                  src={remove}
                  alt="remove"
                />
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Todolist;
