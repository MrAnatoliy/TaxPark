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
    ).then((response) => {
      if (response.status === 200) return response.json();
      if (response.status === 403) {
        setJwt("");
        window.location.href = "login";
      }
    });
  }

  return (
    <>
      <div>
        <label htmlFor="carName">Car Name</label>
        <input
          type="text"
          id="carName"
          value={carName}
          onChange={(event) => setCarName(event.target.value)}
        />
      </div>
      <div>
        <label htmlFor="licensePlate">license Plate</label>
        <input
          type="text"
          id="licensePlate"
          value={carLicensePlate}
          onChange={(event) => setCarLicensePlate(event.target.value)}
        />
      </div>
      <div>
        <select
          name="statusSelect"
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value)}
        >
          <option value="">---select---</option>
          <option value="inUse">In Use</option>
          <option value="inGarage">In Garage</option>
          <option value="inRepair">In repair</option>
        </select>
      </div>
      <div>
        <button id="submit" type="button" onClick={() => createCar()}>
          Create new car
        </button>
      </div>
    </>
  );
};

export default CarCreate;
