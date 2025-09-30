
class Image {
    constructor({ id = null, author, filename, uploadDate = new Date() }) {
        this.id = id;
        this.author = author;
        this.filename = filename;
        this.uploadDate = uploadDate;
    }
}

module.exports = Image;