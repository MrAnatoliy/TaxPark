import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";

const CarView = () => {
  const carID = window.location.href.split("/car/")[1];
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [car, setCar] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8080/api/v1/cars/${carID}`, {
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
          window.location.href = "login";
        }
      })
      .then((carsData) => {
        setCar(carsData);
      });
  }, []);

  return (
    <div id="carView">
      <div id="body">
        <h1>Car {carID}</h1>
        <div id="carDisplay">
          {car ? (
            <>
              <div class="dataRow">
                <h2 class="dataName">Car name: </h2>
                <h2>{car.carName}</h2>
              </div>
              <div class="dataRow">
                <h2 class="dataName">Car license Plate: </h2>
                <h2>{car.federalLicensePlate}</h2>
              </div>
              <div class="dataRow">
                <h2 class="dataName">Car Name: </h2>
                <h2>{car.status}</h2>
              </div>
              <div class="dataRow">
                <h2 class="dataName">Status: </h2>
                <h2>{car.status}</h2>
              </div>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarView;
