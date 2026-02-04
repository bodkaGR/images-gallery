const express = require('express');
const ImageController = require('../interfaces/rest/controllers/ImageController');
const imageRoutesFactory = require('../interfaces/rest/routes/imageRoutes');

module.exports = (imageServiceMock) => {
    const app = express();
    app.use(express.json());

    const controller = new ImageController(imageServiceMock);
    app.use('/api/images', imageRoutesFactory(controller));

    return app;
}