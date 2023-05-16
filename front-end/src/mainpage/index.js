import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link, Route } from "react-router-dom";

import "../style/style.scss";

const Mainpage = () => {
  const [jwt, setJwt] = useLocalState("", "jwt");
  const [car, setCars] = useState(null);
  const [carSearch, setCarSearch] = useState(null);
  const [search, setSearch] = useState("");

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
          window.location.href = "login";
        }
      })
      .then((carsData) => {
        setCars(carsData);
      });
  }, []);

  function getCarList() {
    var cars;
    if (search === "") {
      cars = car;
    } else {
      if (typeof carSearch !== "undefined" && carSearch !== null) {
        if (
          Object.keys(carSearch).length !== 0 &&
          Object.getPrototypeOf(carSearch) !== Object.prototype
        ) {
          cars = carSearch;
        } else {
          return <h1>Nothing has been found</h1>;
        }
      } else {
        return <h1>Nothing has been found</h1>;
      }
    }
    const carList = cars.map((car) => (
      <div key={car.id} id="carGridElement">
        <div>
          <Link to={`/car/${car.id}`}>Car ID : {car.id}</Link>
        </div>
        <div>Car Name : {car.carName}</div>
        <div>Car Plate : {car.federalLicensePlate}</div>
        <div id="status">
          <div id="status_indicator"></div>
          <div>{car.status}</div>
        </div>
      </div>
    ));
    return <ul>{carList}</ul>;
  }

  useEffect(() => {
    if (search === "") return;
    fetch(`http://localhost:8080/api/v1/cars/search/${search}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${jwt}`,
      },
      method: "GET",
    })
      .then((response) => {
        if (response.status === 200) return response.json();
      })
      .then((carsData) => {
        setCarSearch(carsData);
      });
  }, [search]);

  return (
    <div id="mainpage">
      <div id="header">
        <h1>TaxPark</h1>
      </div>
      <div id="body">
        <div id="controll_panel">
          <input
            type="text"
            id="carSearch"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
          <button
            id="addButton"
            onClick={() => (window.location.href = "/createCar")}
          >
            Add new car
          </button>
        </div>
        <div id="carGrid">{car ? getCarList() : <></>}</div>
      </div>
    </div>
  );
};

export default Mainpage;
