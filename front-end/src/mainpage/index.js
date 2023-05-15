import React, { useEffect, useState } from "react";
import { useLocalState } from "../util/useLocalStorage";
import { Link } from "react-router-dom";

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

  function getCarList() {
    var cars = car;
    if (typeof carSearch !== "undefined" && carSearch !== null) {
      if (
        Object.keys(carSearch).length !== 0 &&
        Object.getPrototypeOf(carSearch) !== Object.prototype
      ) {
        cars = carSearch;
        console.log(typeof carSearch);
        console.log(carSearch);
      }
    }
    const carList = cars.map((car) => (
      <li key={car.id}>
        <div>
          <Link to={`/car/${car.id}`}>Car ID : {car.id}</Link>
        </div>
        <div>Car Name : {car.carName}</div>
        <div>Car Plate : {car.federalLicensePlate}</div>
        <div>Car Status : {car.status}</div>
        <br></br>
      </li>
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
    <div>
      <div>
        <input
          type="text"
          id="carSearch"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <button onClick={() => createCar()}>Add new car</button>
      </div>

      {car ? getCarList() : <></>}
    </div>
  );
};

export default Mainpage;
