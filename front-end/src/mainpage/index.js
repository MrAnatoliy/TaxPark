import React from "react";
import { useLocalState } from "../util/useLocalStorage";

const Mainpage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");

  return (
    <div>
      <h1>HELLO REACT.JS and SPRING</h1>
      <div>JWT Value is {jwt}</div>
    </div>
  );
};

export default Mainpage;
