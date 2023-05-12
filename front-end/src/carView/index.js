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
        if (response.status === 403){
            setJwt("");
            window.location.href("login");
        }
      })
      .then((carsData) => {
        setCar(carsData);
      });
  }, []);

  return (
    <div>
      <h1>Car {carID}</h1>
      {car ? (
        <>
          <h2>Status: {car.status}</h2>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CarView;
