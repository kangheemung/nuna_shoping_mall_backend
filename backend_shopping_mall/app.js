const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
require('dotenv').config();
require(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //res.body가 객체로 인식 된다.

const mongoURI = process.env.LOCAL_DB_ACCRESS;
//mongoose　셋팅

mongoose
    .connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('mongoose connected'))
    .catch((err) => console.log('DB connected error', err));
