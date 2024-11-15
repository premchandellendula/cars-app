const mongoose = require('mongoose');
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true
  })
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => {
      console.error('Error connecting to MongoDB', err);
    });

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        minLength: 11,
        maxLength: 50,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    cars: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
    }],
}, {timestamps: true})

const carsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    car_type: {
        type: String,
        required: true,
        trim: true
    },
    company: {
        type: String,
        required: true,
        trim: true
    },
    dealer: {
        type: String,
        trim: true,
        required: false
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'Price must be a positive number']
    },
    images: {
        type: [String],
        validate: {
            validator: function (images) {
                return images.length <= 10;
            },
            message: 'You can upload a maximum of 10 images.'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    tags: [{
        type: String,
        trim: true,
    }],
}, {timestamps: true})

const User = mongoose.model('User', userSchema);
const Car = mongoose.model('Car', carsSchema);

module.exports = {
    User,
    Car
}