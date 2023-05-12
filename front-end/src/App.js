import "./App.css";
import { Routes, Route } from "react-router-dom";
import Mainpage from "./mainpage";
import Login from "./login";
import PrivateRoute from "./privateRoute";
import CarView from "./carView";

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
      <Route path="/car/:id" element={
          <PrivateRoute>
            <CarView />
          </PrivateRoute>
        }/>
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
