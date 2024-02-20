import express from 'express';
import imageRoute from './imageRoutes/index.js';
import doctorRoutes from './doctorRoutes/index.js';
import userRoutes from './userRoutes/index.js';
import departmentRoutes from './departmentRoutes/index.js';
import slotRoutes from './slotRoutes/index.js';
import pharmacyRoutes from './pharmacyRoutes/index.js';
import appointmentRoutes from './appointmentRoutes/index.js';
import prescriptionRoutes from './prescriptionRoutes/index.js';

const router = express.Router();

router.use('/upload', imageRoute);
router.use('/doctor', doctorRoutes);
router.use('/user', userRoutes);
router.use('/department', departmentRoutes);
router.use('/slot', slotRoutes);
router.use('/appointment', appointmentRoutes);
router.use('/pharmacy', pharmacyRoutes);
router.use('/prescription', prescriptionRoutes);

export default router;
