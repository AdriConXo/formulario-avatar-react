import express from 'express';
import multer from 'multer';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, 'uploads/'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

app.post('/profile', upload.single('avatar'), (req, res) => {
  console.log('FICHEIRO:', req.file);
  console.log('DATOS:', req.body);
  res.json({ status: 'ok', file: req.file.filename });
});

app.listen(8080, () => {
  console.log('Servidor escoitando en http://localhost:8080');
});
