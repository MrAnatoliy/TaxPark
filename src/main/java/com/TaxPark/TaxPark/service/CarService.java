package com.TaxPark.TaxPark.service;

import com.TaxPark.TaxPark.domain.Car;
import com.TaxPark.TaxPark.domain.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public Car save() {
        Car car = new Car();
        car.setCarName("preset_car_name");
        car.setFederalLicensePlate("preset_federal_license_plate");
        car.setStatus("preset_status");

        return carRepository.save(car);

    }

    public List<Car> getAllCars(){
        return carRepository.findAll();
    }

    public Optional<Car> findByID(Long carID) {
        return carRepository.findById(carID);
    }
}
