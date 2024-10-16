const express = require('express')
const cors = require('cors')
const {connectDB} = require('./utils/db')

//require routes
const adminRoutes = require('./routes/adminRoutes')
const registerRoutes = require('./routes/registerRoutes')
const loginRoutes = require('./routes/loginRoutes')

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connectDB();

app.use('/admin',adminRoutes)

app.use('/register',registerRoutes)

app.use('/login',loginRoutes);

module.exports = app;

