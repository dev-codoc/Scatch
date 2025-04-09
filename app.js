const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const path = require('path')
const db = require('./config/mongoose-connection')
const expressSession = require('express-session')
const flash = require('connect-flash')

require("dotenv").config();

// Routes
const ownersRouter = require("./routes/ownersRouter")
const usersRouter = require("./routes/usersRouter")
const productsRouter = require("./routes/productsRouter")
const indexRouter = require("./routes/index")


app.use(express.json())
app.use(express.urlencoded({extended : true}))
app.use(cookieParser())
app.use(
    expressSession({
        secret: process.env.EXPRESS_SESSION_SECRET || "secret",
        resave: false,
        saveUninitialized: false,
    })
)
app.use(flash())
app.use(express.static(path.join(__dirname, "public")))
app.set("view engine", "ejs")


app.use("/", indexRouter)
app.use("/owners", ownersRouter)
app.use("/users", usersRouter)
app.use("/products", productsRouter)

app.listen(3000);