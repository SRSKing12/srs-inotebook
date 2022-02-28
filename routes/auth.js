const express = require('express')
const User = require('../models/User')
const router = express.Router()
const {body, validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'Thi$i$@$@mp|eKey'

// ROUTE 1: Creating user using: POST "/api/auth". Doesn't require auth
router.post('/createuser',[
    body('name', 'Invalid Name!').isLength({min: 3}),
    body('email', 'Invalid Email!').isEmail(),
    body('password', 'Password must be atleast 5 characters!').isLength({min: 5}),
] ,async (req, res)=>{
    // If errors, return that request and errors
    const errors = validationResult(req)
    let success = true

    if(!errors.isEmpty()){
        success = false
        return res.status(400).json({success, errors: errors.array()})
    }

    // Check whether user with this email exists already 
    try{

        let user = await User.findOne({email: req.body.email})
        if(user){
            success = false
            return req.status(400).json({success, error: "Sorry, a user with this email already exists!"})
        }

        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)

        // Create new user
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        
        res.json({success, authToken})

    }catch(error){
        success = false
        console.error(error.message)
        res.status(500).send("Some error ocured!")
    }
    })

// ROUTE 2: Validating user using: POST "/api/auth/login". Doesn't require auth
router.post('/login',[
    body('email', 'Invalid Email!').isEmail(),
    body('password', "Password can't be blank!").exists(),
] ,async (req, res)=>{
    const errors = validationResult(req)
    let success = true

    if(!errors.isEmpty()){
        success = false
        return res.status(400).json({errors: errors.array()})
    }

    const {email, password} = req.body
    try {
        let user = await User.findOne({email})
        if(!user){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials!"})
        }

        const passCompare = await bcrypt.compare(password, user.password)
        if(!passCompare){
            success = false
            return res.status(400).json({success, error: "Please try to login with correct credentials!"})
        }

        const data = {
            user:{
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        res.json({success, authToken})

    } catch (error) {
        console.error(error.message)
        res.status(500).send("Internal server error ocured!")
    }
})

// ROUTE 3: Getting logged-in user details using: POST "/api/auth/getuser". Requires auth
    router.post('/getuser', fetchuser, async (req, res)=>{
    try {
        let userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message)
    res.status(500).send("Internal server error ocured!")
    }

})

module.exports = router