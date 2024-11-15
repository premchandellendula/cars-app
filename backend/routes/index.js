const express = require('express');
const userRouter = require('./user');
const carsRouter = require('./cars')

const router = express.Router();

router.use('/user', userRouter);
router.use('/cars', carsRouter);

module.exports = router;