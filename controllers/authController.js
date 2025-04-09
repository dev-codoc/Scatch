const userModel = require("../models/user-model")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
const generateToken = require("../utils/generateToken")

module.exports.registerUser = async (req, res) => {
    try {
        let { email, password, fullname } = req.body;


        let user = await userModel.findOne({ email:email })
        if (user) return res.status(400).send("User already exists")

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    })

                    let token = generateToken(user);
                    res.cookie("token", token)

                    res.send("User created successfully")
                }
            })
        })

    } catch (err) {
        res.send(err.message);

    }
}

module.exports.loginUser = async (req, res) => {

    try{
        let {email, password} = req.body;

        let user = await userModel.findOne({email: email})
        if(!user) return res.status(401).send("1Invalid email or password")

        bcrypt.compare(password, user.password, (err, result) => {
            if(result) {
                let token = generateToken(user);
                res.cookie("token", token)
                res.send("Logged in successfully")
            }
            else {
                return res.status(401).send("2Invalid email or password")
            }
        })
    } catch(err) {
        res.send(err.message);
    }
}