const express = require('express');
const router = express.Router();

// require the Drone model here
const Drone = require('./../models/Drone.model');

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  async function listDrones() {
    try {
      const pr = await Drone.find();
      res.render('drones/list', { pr })
    } catch(err) {
      console.log("There was an error while fetching the drones", err);
    }
  }

  listDrones();
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render('drones/create-form');
});

router.post('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, speed } = req.body;

  async function createDrone() {
    try {
      const pr = await Drone.create( { name, propellers, maxSpeed: speed} );
      res.redirect("/drones");
    } catch(err) {
      console.log("There was an error while creating the new drone", err);
    }
  }

  createDrone();
});

router.get('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;

  async function updateDrone() {
    try {
      const pr = await Drone.findById(id);
      res.render('drones/update-form', { pr });
    } catch(err) {
      console.log("There was an error while trying to update the drone", err);
    }
  }

  updateDrone();
});

router.post('/drones/:id/edit', (req, res, next) => {
  // Iteration #4: Update the drone
  const { id } = req.params;
  const { name, propellers, speed } = req.body;

  async function updateDrone() {
    try {
      const pr = await Drone.findByIdAndUpdate(id, { name, propellers, maxSpeed: speed });
      res.redirect("/drones");
    } catch(err) {
      console.log("There was an error while trying to update the drone", err);
    }
  }

  updateDrone();
});

router.post('/drones/:id/delete', (req, res, next) => {
  // Iteration #5: Delete the drone
  const { id } = req.params;

  async function deleteDrone() {
    try {
      const pr = await Drone.findByIdAndDelete(id);
      res.redirect("/drones");
    } catch(err) {
      console.log("There was an error while trying to delete the drone", err);
    }
  }

  deleteDrone();
});

module.exports = router;
