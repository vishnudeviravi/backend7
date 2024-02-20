import express from 'express';
import bcrypt from 'bcrypt';
import User from '../../db/models/userSchema.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post('/signup', async (req, res) => {
  const body = { ...req.body };
  const isUser = await User.findOne({ username: body.username });
  if (isUser) {
    return res.status(409).json({ message: 'username already taken' });
  }
  if (body.password != body.confirmPassword) {
    return res.status(403).json({ message: 'Passwords dont match' });
  }

  const hashedPassword = await bcrypt.hash(body.password, 2);
  body.password = hashedPassword;

  await User.create(body);
  res.status(201).json({ message: 'Signup Successfull' });
});

router.post('/login', async (req, res) => {
  const body = { ...req.body };
  const user = await User.findOne({ username: body.username });
  if (!user) {
    return res.status(401).json({ message: 'username or password incorrect' });
  }
  console.log(user);
  const isMatching = await bcrypt.compare(body.password, user.password);
  if (!isMatching) {
    return res.status(401).json({ message: 'username or password incorrect' });
  }

  const token = jwt.sign(
    { id: user._id, role: 'USER' },
    process.env.SECRET_KEY,
    {
      expiresIn: '7d',
    }
  );
  return res.status(200).json({ message: 'Login Successfull', token: token });
});

router.get('/profile/:id', async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id);
  user.password = '';
  res.status(200).json(user);
});

export default router;
