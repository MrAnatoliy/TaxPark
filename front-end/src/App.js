import { useEffect } from "react";
import "./App.css";
import { useLocalState } from "./util/useLocalStorage";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./mainpage";
import Login from "./login";
import PrivateRoute from "./privateRoute";

function App() {
  return (
    <Routes>
      <Route
        path="/*"
        element={
          <PrivateRoute>
            <Mainpage />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
