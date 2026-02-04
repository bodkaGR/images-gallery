require('dotenv').config();
const express = require('express');
const mongoose = require("mongoose");
const cors = require('cors');
const path = require("node:path");
const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");

const { typeDefs } = require('./interfaces/graphql/imageSchema')
const { resolvers } = require('./interfaces/graphql/imageResolvers');

const ImageRepositoryMongo = require('./infrastructure/database/mongoose/ImageRepositoryMongo');
const ImageService = require('./application/ImageService');
const ImageController = require('./interfaces/rest/controllers/ImageController');
const imageRoutesFactory = require('./interfaces/rest/routes/imageRoutes');

const server = express();
const port = process.env.PORT || 3000;
const apolloServer = new ApolloServer({ typeDefs, resolvers });

startStandaloneServer(apolloServer, { listen: { port: 4000 } }).then(({ url }) => {
   console.log(`GraphQL running on ${url}`);
});

server.use(cors());
server.use(express.json());
server.use(express.static(path.join(__dirname, 'public')));

mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error("MongoDB Connection Error: ", err));

const repositoryMongo = new ImageRepositoryMongo();
const service = new ImageService(repositoryMongo);
const controller = new ImageController(service);

server.use('/api/images', imageRoutesFactory(controller));

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});