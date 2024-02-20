import express from 'express';
import multer from 'multer';

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/image', upload.single('file'), (req, res) => {
  res.json({ url: `http://localhost:4000/${req.file.filename}` });
});

export default router;
