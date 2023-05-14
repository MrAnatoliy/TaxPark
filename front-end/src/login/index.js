import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [jwt, setJwt] = useLocalState("", "jwt");

  function sendLoginRequest() {
    if (!jwt) {
      const reqBody = {
        email: email,
        password: password,
      };

      fetch("http://localhost:8080/api/v1/auth/authenticate", {
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(reqBody),
        method: "post",
      })
        .then((response) => {
          if (response.status === 200)
            return Promise.all([response.json(), response.headers]);
          else return Promise.reject("invalid login attempt");
        })
        .then(([body, headers]) => {
          setJwt(body["token"]);
          window.location.href = "main";
        })
        .catch((message) => {
          alert(message);
        });
    } else {
      window.location.href = "mainpage";
    }
  }

  return (
    <>
      <div>
        <label htmlFor="username">Email</label>
        <input
          type="email"
          id="username"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button id="submit" type="button" onClick={() => sendLoginRequest()}>
          Login
        </button>
      </div>
    </>
  );
};

export default Login;
