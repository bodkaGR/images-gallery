class ImageController {
    constructor(imageService) {
        this.imageService = imageService;
    }

    create = async (req, res) => {
        try {
            const image = await this.imageService.createImage(req.body);
            res.status(201).json(image);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    getAll = async (req, res) => {
        const images = await this.imageService.getAllImages();
        res.status(200).json(images);
    };

    getById = async (req, res) => {
        try {
            const image = await this.imageService.getImageById(req.params.id);
            res.status(200).json(image);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    };

    update = async (req, res) => {
        try {
            const image = await this.imageService.updateImage(req.params.id, req.body);
            res.status(200).json(image);
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    }

    delete = async (req, res) => {
        try {
            await this.imageService.deleteImage(req.params.id);
            res.status(200).json({ message: 'Image deleted!' });
        } catch (err) {
            res.status(404).json({ error: err.message });
        }
    };
}

module.exports = ImageController;