// Iteration #1
const mongoose = require('mongoose');
const Drone = require('./../models/Drone.model');

const drones = [
    { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
    { name: "Racer 57", propellers: 4, maxSpeed: 20 },
    { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
]

mongoose
  .connect("mongodb://localhost/lab-express-drones", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    return x.connection.dropDatabase();
  })
  .then(() => Drone.create(drones))
  .then((createdDrones) => {
    console.log('Database has been seeded!', createdDrones);
    mongoose.disconnect();
  })
  .then(() => {
      console.log('Disconnected from Mongo!');

  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

  