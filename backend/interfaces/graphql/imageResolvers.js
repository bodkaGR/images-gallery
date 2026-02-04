const ImageRepository = require('../../infrastructure/database/mongoose/ImageRepositoryMongo');
const Image = require('../../domain/Image');
const imageRepository = new ImageRepository();

const resolvers = {
    Query: {
        images: async () => {
            const images = await imageRepository.getAll();
            return images.map(image => imageDateCorrector(image));
        },
        image: async (_, { id }) => {
            const retrievedImage = await imageRepository.getById(id);
            if (retrievedImage) {
                return imageDateCorrector(retrievedImage);
            }
        }
    },
    Mutation: {
        createImage: async (_, { input }) => {
            const createdImage = await imageRepository.create(input);
            if (createdImage) {
                return imageDateCorrector(createdImage);
            }
        },
        updateImage: async (_, { id, input }) => {
            const updatedImage = await imageRepository.updateById(id, input);
            return imageDateCorrector(updatedImage);
        },
        deleteImage: async (_, { id }) => {
            const result = await imageRepository.delete(id);
            return !!result;
        }
    }
};

imageDateCorrector = (image) => {
    return new Image({
        id: image.id,
        author: image.author,
        filename: image.filename,
        uploadDate: new Date(image.uploadDate).toISOString(),
    });
}

module.exports = {
    resolvers
};