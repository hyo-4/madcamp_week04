import React from "react";
import { useCountStore } from "../store/count";

const MainPage: React.FC = () => {
  //useCountStore 아용해서 전역적으로 변수 선언해서 사용가능!
  const { count, increment } = useCountStore();

  return (
    <div>
      <h1>Main Page</h1>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment Count</button>
    </div>
  );
};

export default MainPage;
