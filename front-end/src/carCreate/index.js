import React, { useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

const CarCreate = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [carName, setCarName] = useState("");
  const [carLicensePlate, setCarLicensePlate] = useState("");
  const [status, setStatus] = useState("");

  function createCar() {
    console.log(carName);
    console.log(carLicensePlate);
    console.log(status);
    fetch(
      `http://localhost:8080/api/v1/cars/${carName}/${carLicensePlate}/${status}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${jwt}`,
        },
        method: "POST",
      }
    )
      .then((response) => {
        if (response.status === 200) return response.json();
        if (response.status === 403) {
          setJwt("");
          window.location.href = "login";
        }
      })
      .then(() => {
        window.location.href = "mainpage";
      });
  }

  return (
    <div id="carCreate">
      <div id="header">
        <a href="mainpage">
          <h1>TaxPark</h1>
        </a>
        <a href="login" onClick={() => setJwt("") }>
          <h1>Log out</h1>
        </a>
      </div>
      <div id="body">
        <h1>Create Car</h1>
        <div id="createForm">
          <div class="input_row">
            <h3>Car name</h3>
            <input
              type="text"
              id="carName"
              value={carName}
              onChange={(event) => setCarName(event.target.value)}
            />
          </div>
          <div class="input_row">
            <h3>License plate</h3>
            <input
              type="text"
              id="licensePlate"
              value={carLicensePlate}
              onChange={(event) => setCarLicensePlate(event.target.value)}
            />
          </div>
          <div class="input_row">
            <h3 id="select_info">Car status</h3>
            <div id="selectInput">
              <select
                name="statusSelect"
                id="status"
                value={status}
                onChange={(event) => setStatus(event.target.value)}
              >
                <option class="option" value="">
                  ---select---
                </option>
                <option class="option" value="inUse">
                  In Use
                </option>
                <option class="option" value="inGarage">
                  In Garage
                </option>
                <option class="option" value="inRepair">
                  In repair
                </option>
              </select>
            </div>
          </div>
          <div>
            <button id="submit" type="button" onClick={() => createCar()}>
              Create new car
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCreate;
