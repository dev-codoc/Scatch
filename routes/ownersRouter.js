const express = require('express')
const router = express.Router()
const ownerModel = require("../models/owners-model")

router.get("/", (req, res)=>{
    res.send("hey it's working")
})

// ye route jab tak work karega jab tak apka environment ha development
if (process.env.NODE_ENV === "development") {
    router.post("/create", async (req, res) => {
        let owners = await ownerModel.find();
        if (owners.length > 0) {
            return res
              .status(504)
              .send("You don't have the permission to create a owner.")
        }


        let {fullname, email, password} = req.body;
        let createdOwner = await ownerModel.create({
            fullname,
            email,
            password,
        })
        res.status(201).send(createdOwner)
    })
}



module.exports = router;