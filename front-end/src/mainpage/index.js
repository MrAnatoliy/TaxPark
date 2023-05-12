import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";

const Mainpage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [car, setCars] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/cars", {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
        if (response.status === 403) {
          setJwt("");
          window.location.href("login");
        }
      })
      .then((carsData) => {
        setCars(carsData);
      });
  }, []);

  function createCar() {
    fetch("http://localhost:8080/api/v1/cars", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "POST",
    })
      .then((response) => {
        if (response.status === 200)
          return Promise.all([response.json(), response.headers]);
        else if (response.status === 403) {
          setJwt("");
          window.location.href("login");
        } else return Promise.reject("Bad data");
      })
      .then(([body, headers]) => {
        window.location.href = `/car/${body.id}`;
      });
  }

  return (
    <div>
      <button onClick={() => createCar()}>Add new car</button>
      {car ? (
        car.map((car) => (
          <div>
            <div>
              <Link to={`/car/${car.id}`}>Car ID : {car.id}</Link>
            </div>
            <div>Car Name : {car.carName}</div>
            <div>Car Plate : {car.federalLicensePlate}</div>
            <div>Car Status : {car.status}</div>
            <br></br>
          </div>
        ))
      ) : (
        <></>
      )}
    </div>
  );
};

export default Mainpage;
