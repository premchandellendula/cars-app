const express = require('express');
const { authMiddleware } = require('../middleware');
const { Car, User } = require('../db');
const router = express.Router();
const cloudinary = require('../utils/cloudinary')

router.post("/car", authMiddleware, async (req, res) => {
    const {title, description, car_type, company, dealer, price, images, tags} = req.body
    try{
        if (!title || !description || !car_type || !company || !price) {
            return res.status(400).json({
                message: "Missing required fields (title, description, car_type, company, price)"
            });
        }

        const imageUrls = images && Array.isArray(images) ? images : [];
        // console.log('before car creation')
        const car = new Car({
            title: title,
            description: description,
            car_type: car_type,
            company: company,
            dealer: dealer,
            price: price,
            images: imageUrls,
            tags: tags,
            user: req.userId
        })

        // console.log('before car save')

        await car.save();
        // console.log('after car save')

        await User.findByIdAndUpdate(req.userId, {
            $push: {cars: car._id}
        })

        res.json({
            message: "Car added successfully",
            car
        })
    }catch(err){
        console.log("err:", err)
        res.status(400).json({
            message: "error"
        })
    }
})

router.get('/cars', authMiddleware, async (req, res) => {
    try {
        const cars = await Car.find({ user: req.userId });

        res.status(200).json({ 
            message: 'Cars retrieved successfully',
            cars 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching cars', 
            error: error.message 
        });
    }
});

router.get('/cars/:id', authMiddleware, async (req, res) => {
    const carId = req.params.id;

    try {
        const car = await Car.findOne({ 
            _id: carId
        });

        if (!car){
            return res.status(404).json({ 
                message: 'Car not found or not authorized' 
            });
        } 

        res.status(200).json({ 
            message: 'Car retrieved successfully', 
            car
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error fetching car', 
            error: error.message 
        });
    }
});

router.put('/cars/:id', authMiddleware, async (req, res) => {
    const carId = req.params.id;
    const updates = req.body;

    try {
        const car = await Car.findOneAndUpdate({ 
            _id: carId, 
            user: req.userId 
        }, updates, { new: true });

        if (!car){
            return res.status(404).json({ 
                message: 'Car not found or not authorized' 
            });
        } 

        res.status(200).json({ 
            message: 'Car updated successfully', 
            car 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error updating car', 
            error: error.message 
        });
    }
});

router.delete('/cars/:id', authMiddleware, async (req, res) => {
    const carId = req.params.id;

    try {
        const car = await Car.findOneAndDelete({ 
            _id: carId, 
            user: req.userId 
        });

        if (!car){
            return res.status(404).json({ 
                message: 'Car not found or not authorized'
            });
        } 

        res.status(200).json({ 
            message: 'Car deleted successfully' 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error deleting car', 
            error: error.message 
        });
    }
});


/* ------------------------------------- FETCHING ALL CARS ---------------------------------------- */

router.get('/totalcars', async (req, res) => {
    try{
        const cars = await Car.find({});

        res.status(200).json({ 
            message: 'Cars fetched successfully',
            cars 
        });
    }catch (error) {
        res.status(500).json({ 
            message: 'Error fetching cars', 
            error: error.message 
        });
    }
})


/* ------------------------------------- SEARCH CARS ---------------------------------------- */

router.get('/cars/search', async (req, res) => {
    const { searchTerm } = req.query;

    try {
        const searchQuery = {
            $or: [
                { title: { $regex: searchTerm, $options: 'i' } },  
                { description: { $regex: searchTerm, $options: 'i' } },  
                { company: { $regex: searchTerm, $options: 'i' } },  
                { car_type: { $regex: searchTerm, $options: 'i' } },  
                { tags: { $in: [searchTerm] } }
            ]
        };

        const cars = await Car.find(searchQuery);

        if (cars.length === 0) {
            return res.status(404).json({
                message: 'No cars found matching your search criteria',
            });
        }

        res.status(200).json({
            message: 'Cars retrieved successfully',
            cars,
        });
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching cars',
            error: error.message,
        });
    }
});


module.exports = router