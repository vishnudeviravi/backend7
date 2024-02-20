import express from 'express';
import Prescription from '../../db/models/prescriptionSchema.js';
import Pharmacy from '../../db/models/pharmacySchema.js';

const router = express.Router();

// add prescription by doctor
router.post('/doctor', async (req, res) => {
  const body = { ...req.body };
  await Prescription.create(body);
  res.status(201).json({ message: 'Prescription added' });
});

// list prescription using appointment
router.get('/appointment/:id', async (req, res) => {
  const { id } = req.params;
  const prescription = await Prescription.find({ appointment: id });
  res.status(201).json(prescription);
});

// get medicines using prescription id
router.get('/pharmacy/:id', async (req, res) => {
  const { id } = req.params;
  const prescription = await Prescription.findById(id);
  const pharmacy = await Pharmacy.find({
    _id: { $in: prescription.medication },
  });
  res.status(200).json(pharmacy);
});

export default router;
