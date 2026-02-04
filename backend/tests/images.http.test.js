const request = require('supertest');
const setupTestApp = require('./setupTestApp');

describe('Images API (HTTP)', () => {
   let app;
   let imageServiceMock;

   beforeEach(() => {
      imageServiceMock = {
          createImage: jest.fn(),
          getAllImages: jest.fn(),
          getImageById: jest.fn(),
          updateImage: jest.fn(),
          deleteImage: jest.fn(),
      };

      app = setupTestApp(imageServiceMock);
   });

   describe('POST /api/images', () => {
        it('201 - creates image', async () => {
            const image = { author: 'Bob', filename: 'bob-image.jpg', uploadDate: new Date() };
            imageServiceMock.createImage.mockResolvedValue(image);

            const response = await request(app)
                .post('/api/images')
                .send({ name: 'img' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual({
                author: 'Bob',
                filename: 'bob-image.jpg',
                uploadDate: image.uploadDate.toISOString()
            });
            expect(imageServiceMock.createImage).toHaveBeenCalledWith({ name: 'img' });
        });

        it('400 - validation error', async () => {
            imageServiceMock.createImage.mockRejectedValue(new Error('Invalid data'));

            const response = await request(app)
                .post('/api/images')
                .send({});

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Invalid data' });
        });
   });

    describe('GET /api/images', () => {
        it('200 – returns all images', async () => {
            const images = [
                { id: '1', author: 'Bob', filename: 'bob-image.jpg', uploadDate: new Date() },
                { id: '2', author: 'Bob2', filename: 'bob2-image.jpg', uploadDate: new Date() }
            ];
            imageServiceMock.getAllImages.mockResolvedValue(images);

            const response = await request(app).get('/api/images');

            expect(response.status).toBe(200);
            expect(response.body).toEqual([
                { id: '1', author: 'Bob', filename: 'bob-image.jpg', uploadDate: images[0].uploadDate.toISOString() },
                { id: '2', author: 'Bob2', filename: 'bob2-image.jpg', uploadDate: images[1].uploadDate.toISOString() }
            ]);
        });
    });

    describe('GET /api/images/:id', () => {
        it('200 – returns image by id', async () => {
            const image = { id: '1', author: 'Bob', filename: 'bob-image.jpg', uploadDate: new Date() };
            imageServiceMock.getImageById.mockResolvedValue(image);

            const response = await request(app).get('/api/images/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: '1', author: 'Bob', filename: 'bob-image.jpg', uploadDate: image.uploadDate.toISOString()
            });
        });

        it('400 – not found', async () => {
            imageServiceMock.getImageById.mockRejectedValue(
                new Error('Not found')
            );

            const response = await request(app).get('/api/images/1');

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'Not found' });
        });
    });

    describe('PUT /api/images/:id', () => {
        it('200 – updates image', async () => {
            const updated = { id: '1', author: 'Bob', filename: 'bob-image.jpg', uploadDate: new Date() };
            imageServiceMock.updateImage.mockResolvedValue(updated);

            const response = await request(app)
                .put('/api/images/1')
                .send({ name: 'updated' });

            expect(response.status).toBe(200);
            expect(response.body).toEqual({
                id: '1', author: 'Bob', filename: 'bob-image.jpg', uploadDate: updated.uploadDate.toISOString()
            });
            expect(imageServiceMock.updateImage)
                .toHaveBeenCalledWith('1', { name: 'updated' });
        });
    });

    describe('DELETE /api/images/:id', () => {
        it('200 – deletes image', async () => {
            imageServiceMock.deleteImage.mockResolvedValue();

            const response = await request(app)
                .delete('/api/images/1');

            expect(response.status).toBe(200);
            expect(response.body).toEqual({ message: 'Image deleted!' });
        });

        it('404 – delete error', async () => {
            imageServiceMock.deleteImage.mockRejectedValue(
                new Error('Not found')
            );

            const response = await request(app)
                .delete('/api/images/1');

            expect(response.status).toBe(404);
            expect(response.body).toEqual({ error: 'Not found' });
        });
    });
});
