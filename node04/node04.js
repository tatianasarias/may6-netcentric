const express = require("express");

const app = express();
const port = 3000;

// Middleware
app.use(express.json());
app.use(express.static("public"));

// In-memory car data
let cars = [
  { id: 1, brand: "Toyota", make: "Camry", year: 2020, color: "Silver" },
  { id: 2, brand: "Honda", make: "Civic", year: 2019, color: "Blue" },
  { id: 3, brand: "Ford", make: "Mustang", year: 2021, color: "Red" },
  { id: 4, brand: "Chevrolet", make: "Malibu", year: 2018, color: "Black" },
  { id: 5, brand: "Tesla", make: "Model 3", year: 2022, color: "White" }
];

// GET all cars
app.get("/api/cars", (req, res) => {
  res.json(cars);
});

// GET one car
app.get("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const car = cars.find(c => c.id === id);

  if (!car) {
    return res.status(404).json({ error: "Car not found" });
  }

  res.json(car);
});

// POST new car
app.post("/api/cars", (req, res) => {
  const { brand, make, year, color } = req.body;

  const newCar = {
    id: cars.length > 0 ? Math.max(...cars.map(c => c.id)) + 1 : 1,
    brand,
    make,
    year: Number(year),
    color
  };

  cars.push(newCar);

  res.status(201).json(newCar);
});

// PUT update car
app.put("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  cars[index] = {
    ...cars[index],
    ...req.body,
    id
  };

  res.json(cars[index]);
});

// DELETE car
app.delete("/api/cars/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = cars.findIndex(c => c.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Car not found" });
  }

  const deletedCar = cars.splice(index, 1)[0];

  res.json({
    message: "Car deleted",
    car: deletedCar
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});