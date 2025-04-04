const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

router.get("/", (req, res) => {
    res.send("hey it's working")
})

router.post("/register", (req, res) => {
    try {
        let { email, password, fullname } = req.body;

        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(password, salt, async (err, hash) => {
                if (err) return res.send(err.message)
                else {
                    let user = await userModel.create({
                        email,
                        password: hash,
                        fullname,
                    })

                    let token = jwt.sign({email, id: user._id}, "hehehehe");
                    res.cookie("token", token)
                    res.send("User created successfully")
                }
            })
        })


    } catch (err) {
        res.send(err.message);

    }
})

module.exports = router;
