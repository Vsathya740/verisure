import express from 'express';
import applicationRegistrationRoutes from './modules/ApplicationRegistration/applicationRegistration.controller';
import employmentVerificationReportRoutes from './modules/EmployeeVerificationReport/employeeVerificationReport.controller';
import customerContactReportRoutes from './modules/CustomerContactSupport/customerContactSupport.controller';
import authRoutes from './modules/auth/auth';
import { authenticateToken } from './modules/auth/auth';
import applicationRoutes from './modules/application.routes';

const router = express.Router();

router.get('/', (_, res) => {
  res.json({ message: 'Welcome to the API' });
});

// Public routes
router.use('/auth', authRoutes);
router.use('/applications', applicationRoutes);

// Protected routes
router.use('/application-registration', authenticateToken, applicationRegistrationRoutes);
router.use('/employment-verification-report', authenticateToken, employmentVerificationReportRoutes);
router.use('/customer-contact-report', authenticateToken, customerContactReportRoutes);

export default router;