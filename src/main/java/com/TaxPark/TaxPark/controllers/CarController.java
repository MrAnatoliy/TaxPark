package com.TaxPark.TaxPark.controllers;

import com.TaxPark.TaxPark.domain.Car;
import com.TaxPark.TaxPark.domain.User;
import com.TaxPark.TaxPark.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/v1/cars")
public class CarController {

    @Autowired
    private CarService carService;

    @PostMapping("")
    public ResponseEntity<?> createCar (@AuthenticationPrincipal User user){
        Car newCar = carService.save();

        System.out.println(newCar);

        return ResponseEntity.ok(newCar);
    }

    @GetMapping("")
    public ResponseEntity<?> getCars(@AuthenticationPrincipal User user){
        return ResponseEntity.ok(carService.getAllCars());
    }

    @GetMapping("{carID}")
    public ResponseEntity<?> getCar(@PathVariable Long carID){
        Optional<Car> carOpt = carService.findByID(carID);
        return ResponseEntity.ok(carOpt.orElse(new Car()));
    }

    @GetMapping("search/{search}")
    public ResponseEntity<?> searchCar(@PathVariable String search){
        return ResponseEntity.ok(carService.getCarsByName(search));
    }

}
