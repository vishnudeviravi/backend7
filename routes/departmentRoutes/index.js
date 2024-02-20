import express from 'express';
import checkToken from '../../middleware/checkToken.js';
import Department from '../../db/models/departmentSchema.js';
import Doctor from '../../db/models/doctorSchema.js';

const router = express.Router();

// list all departments
router.get('/', checkToken(['USER', 'DOCTOR']), async (req, res) => {
  const departments = await Department.find();
  res.status(200).json(departments);
});

// list doctors by department
router.get('/doctor/:id', checkToken(['USER']), async (req, res) => {
  const { id } = req.params;
  const doctor = await Doctor.find({ department: id });
  res.status(200).json(doctor);
});

// add department
router.post('/', checkToken(['DOCTOR']), async (req, res) => {
  const body = { ...req.body };
  await Department.create(body);
  res.status(200).json({ message: 'Department successfully added' });
});

export default router;
