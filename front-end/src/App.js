import { useEffect } from "react";
import "./App.css";
import { useLocalState } from "./util/useLocalStorage";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./mainpage";
import Login from "./login";

function App() {
  const [jwt, setJwt] = useLocalState("", "jwt");

  // useEffect(() => {
  //   if (!jwt) {
  //     const reqBody = {
  //       email: "rodionov.tolik@gmail.com",
  //       password: "qwerty",
  //     };

  //     fetch("http://localhost:8080/api/v1/auth/authenticate", {
  //       headers: {
  //         "Content-type": "application/json",
  //       },
  //       body: JSON.stringify(reqBody),
  //       method: "post",
  //     })
  //       .then((response) => Promise.all([response.json(), response.headers]))
  //       .then(([body, headers]) => {
  //         setJwt(body["token"]);
  //       });
  //   }
  // });

  useEffect(() => {
    console.log(jwt);
  }, [jwt]);

  return (
    <Routes>
      <Route path="main" element={<Mainpage />} />
      <Route path="/" element={<Login />} />
    </Routes>
  );
}

export default App;
