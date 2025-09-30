const ImageModel = require('./ImageModel');
const Image = require('../../../domain/Image');

class ImageRepositoryMongo {
    async create(data) {
        const doc = await ImageModel.create(data);
        return new Image({ id: doc._id, ...doc.toObject() });
    }

    async getAll() {
        const docs = await ImageModel.find().sort({ createdAt: -1 });
        return docs.map(doc => new Image({ id: doc._id, ...doc.toObject() }));
    }

    async getById(id) {
        const doc = await ImageModel.findById(id);
        return doc ? new Image({ id: doc._id, ...doc.toObject() }) : null;
    }

    async updateById(id, data) {
        const updated =  await ImageModel.findByIdAndUpdate(id, data, { new: true });
        return updated ? new Image({ id: updated._id, ...updated.toObject() }) : null;
    }

    async delete(id) {
        return await ImageModel.findByIdAndDelete(id);
    }
}

module.exports = ImageRepositoryMongo;