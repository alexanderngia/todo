import React from "react";
import styles from "./App.module.scss";
import Todolist from "./components/todolist/todolist";
interface AppProps {}

const App: React.FC<AppProps> = (props) => {
  return (
    <div className={styles["app"]}>
      <Todolist />
    </div>
  );
};

export default App;
