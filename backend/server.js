require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("node:path");

const app = express();
const port = process.env.PORT || 3000;

const ImageRepositoryMongo = require('./infrastructure/database/mongoose/ImageRepositoryMongo');
const ImageService = require('./application/ImageService');
const ImageController = require('./interfaces/controllers/ImageController');
const imageRoutesFactory = require('./interfaces/routes/imageRoutes');

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error("MongoDB Connection Error: ", err));

const repositoryMongo = new ImageRepositoryMongo();
const service = new ImageService(repositoryMongo);
const controller = new ImageController(service);

app.use('/api/images', imageRoutesFactory(controller));

app.listen(port, () => console.log(`Listening on port ${port}`));