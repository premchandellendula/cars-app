const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const bcrypt = require('bcryptjs');
const { JWT_SECRET } = require('../config');

router.post('/signup', async (req, res) => {
    const existingUser = await User.findOne({
        email: req.body.email
    })

    if(existingUser){
        return res.status(411).json({
            message: "Email already taken/ user already exists"
        })
    }

    const {email, password, name} = req.body;
    try{
        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            email: email,
            password: hashedPassword,
            name: name
        })

        res.json({
            message: "User created succefully"
        })
    }catch(e){
        return res.status(500).json({
            message: "Error creating user", 
            error: e.message
        })
    }
})

router.post("/signin", async (req, res) => {
    const {email, password} = req.body;
    try{
        const user = await User.findOne({
            email: email
        })

        if(!user){
            return res.status(403).json({
                message: "User not found"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            return res.status(403).json({
                message: "Incorrect password"
            })
        }

        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET)

        res.json({
            token
        })
    }catch(e){
        return res.status(500).json({
            message: "Error while signing in"
        })
    }
})

module.exports = router