const express = require('express');
const route = express.Router();
const user = require('../controllers/User');

route.post('/signup', user.Signup);
route.post('/login', user.Login);
route.post('/predict', user.PredictImage);


module.exports = route;