'use strict';

const { Router } = require('express');
const router = new Router();

// List restaurants
router.get('/', (req, res, next) => {
  // Restaurant.where('location')
  //   .within({
  //     center: [-9.1, 38.3],
  //     radius: 0.025,
  //     unique: true,
  //     spherical: true
  //   })
  Restaurant.find({
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates: [-9.1, 38.3]
        },
        $minDistance: 20000,
        $maxDistance: 50000
      }
    }
  })
    .then(restaurants => {
      res.render('restaurant/list', { restaurants });
    })
    .catch(error => {
      console.log(error);
      next(error);
    });
});

router.get('/create', (req, res, next) => {
  // ...
  res.render('restaurant/create');
});

const Restaurant = require('./../models/restaurant');

// Create a restaurant
router.post('/create', (req, res, next) => {
  Restaurant.create({
    name: req.body.name,
    location: {
      coordinates: [
        parseFloat(req.body.longitude.replace(',', '.')),
        parseFloat(req.body.latitude.replace(',', '.'))
      ]
    }
  })
    .then(restaurant => {
      res.redirect(`/restaurants/${restaurant._id}`);
    })
    .catch(error => {
      next(error);
    });
});

// Load restaurant
router.get('/:id', (req, res, next) => {
  Restaurant.findById(req.params.id)
    .then(restaurant => {
      res.render('restaurant/single', { restaurant });
    })
    .catch(error => {
      next(error);
    });
});

module.exports = router;
