import request from 'supertest';
import app from '../index';

describe('API Tests', () => {
  it('should upload a measure', async () => {
    const res = await request(app)
      .post('/upload')
      .send({
        image: "base64-string-here",
        customer_code: "1234",
        measure_datetime: "2024-08-28T12:34:56Z",
        measure_type: "WATER"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('image_url');
    expect(res.body).toHaveProperty('measure_value');
    expect(res.body).toHaveProperty('measure_uuid');
  });
});
