import express from 'express';
import bcrypt from 'bcrypt';
import Doctor from '../../db/models/doctorSchema.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const body = { ...req.body };
  const isDoctor = await Doctor.findOne({ username: body.username });
  if (isDoctor) {
    return res.status(409).json({ message: 'username already taken' });
  }
  if (body.password != body.confirmPassword) {
    return res.status(403).json({ message: 'Passwords dont match' });
  }

  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;

  await Doctor.create(body);
  res.status(201).json({ message: 'Signup Successfull' });
});

router.post('/login', async (req, res) => {
  const body = { ...req.body };
  const doctor = await Doctor.findOne({ username: body.username });
  if (!doctor) {
    return res.status(401).json({ message: 'username or password incorrect' });
  }

  const isMatching = await bcrypt.compare(body.password, doctor.password);
  if (!isMatching) {
    return res.status(401).json({ message: 'username or password incorrect' });
  }

  const token = jwt.sign(
    { id: doctor._id, role: 'DOCTOR' },
    process.env.SECRET_KEY,
    {
      expiresIn: '7d',
    }
  );
  return res.status(200).json({ message: 'Login Successfull', token: token });
});

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.findById(id).populate('department');
  console.log(doctor);
  doctor.password = '';
  res.status(200).json(doctor);
});

export default router;
