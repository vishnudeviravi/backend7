import express from 'express';
import Appointment from '../../db/models/appointmnetSchema.js';
import Slot from '../../db/models/slotSchema.js';

const router = express.Router();

// list appointments by doctor
router.get('/doctor/:id', async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ doctor: id });
  res.status(200).json(appointments);
});

// list appointments by user
router.get('/user/:id', async (req, res) => {
  const { id } = req.params;
  const appointments = await Appointment.find({ user: id });
  res.status(200).json(appointments);
});

// take appointment by user
router.post('/', async (req, res) => {
  const body = { ...req.body };
  const slotId = body.slot;
  await Appointment.create(body);
  await Slot.findByIdAndUpdate(slotId, { availability: false });
  res.status(200).json({ message: 'Appointment booked' });
});

router.post('/status/:id', async (req, res) => {
  const { id } = req.params;
  const body = { ...req.body };
  const slotId = body.slot;
  await Appointment.findByIdAndUpdate(id, body);
  res.status(200).json({ message: 'Appointment booked' });
});

export default router;
