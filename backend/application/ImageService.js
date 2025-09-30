
class ImageService {
    constructor(imageRepository) {
        this.imageRepository = imageRepository;
    }

    async createImage(data) {
        if (!data.author || !data.filename) {
            throw new Error('Author and filename is required');
        }
        return await this.imageRepository.create(data);
    }

    async getAllImages() {
        return await this.imageRepository.getAll();
    }

    async getImageById(id){
        const image = await this.imageRepository.getById(id);
        if (!image) {
            throw new Error('Image not found');
        }
        return image;
    }

    async updateImage(id, data) {
        if (!data.author || !data.filename) {
            throw new Error('Author and filename is required');
        }
        return await this.imageRepository.updateById(id, data);
    }

    async deleteImage(id) {
        const deleted = await this.imageRepository.delete(id);
        if (!deleted) {
            throw new Error('Image not found');
        }
        return deleted;
    }
}

module.exports = ImageService;