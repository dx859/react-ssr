import React, { useState } from "react";
import classes from "./index.css";

const Home = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={classes.wrap}>
      <button onClick={() => setCount(count + 1)}>click me</button>
      <p>count: {count}</p>
      <h2>helom</h2>
    </div>
  );
};

export default Home;
