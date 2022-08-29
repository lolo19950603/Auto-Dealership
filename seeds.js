// utility to initialize database
require("./config/database");
const fs = require("fs");
const Car = require("./models/car");

// fs.readFile("./public/cars-database/cars.csv", "utf8", function (err, cars) {
//   /* parse data */
//   cars = cars.split("\n");
//   cars.forEach((car) => {
//     car.replace("-", "2022");
//     car = car.split(";");
//     let rangeArray = [];
//     if (car[3] === "-") {
//       for (let i = parseInt(car[2]); i <= 2022; i++) {
//         rangeArray.push(i);
//       }
//     } else {
//       for (let i = parseInt(car[2]); i <= parseInt(car[3]); i++) {
//         rangeArray.push(i);
//       }
//     }
//     rangeArray.forEach((modelYear) => {
//       var carObject = new Car({ year: modelYear, make: car[0], model: car[1] });
//       carObject.save();
//     });
//   });
// });

Car.find({}).then(function (movies) {
  console.log(movies);
});
