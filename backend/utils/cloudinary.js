const { v2 } = require('cloudinary');
const dotenv = require('dotenv')

dotenv.config();


v2.config({
    api_key: process.env.CLOUD_KEY,
    cloud_name: process.env.CLOUD_NAME,
    api_secret: process.env.CLOUD_KEY_SECRET
})

module.exports = v2