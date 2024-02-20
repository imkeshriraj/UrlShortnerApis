const express = require('express');
const path = require('path');
const app = express();
const port = 3001;
const urlRoute = require('./routes/url');
const staticRouter = require('./routes/staticRouter');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./connection');
connectDB();

const URL = require('./models/url');
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded form data
app.use("/url", urlRoute);
app.use("/", staticRouter);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});