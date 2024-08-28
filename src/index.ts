import express from 'express';
import dotenv from 'dotenv';
import uploadImage from './controllers/uploadController';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('API Running');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.post('/upload', uploadImage);
