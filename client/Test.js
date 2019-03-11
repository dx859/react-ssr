import React, { useState } from "react";
import classes from './Test.css';


const Test = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={classes.wrap}>
      <div className={classes.left}>
        <button className={classes.button} onClick={() => setCount(count + 1)}>click me</button>
      </div>
      <div className={classes.right}>
        <p>count: {count}</p>
      </div>
    </div>
  );
};

export default Test;
