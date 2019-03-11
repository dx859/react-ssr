import React, { useState } from "react";

const Test = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => setCount(count + 1)}>click me</button>
      <p>count: {count}</p>
    </div>
  );
};

export default Test;
