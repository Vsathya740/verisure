import express from 'express';
import applicationRegistrationRoutes from './modules/ApplicationRegistration/applicationRegistration.controller';
import verifierObservationsRoutes from './modules/VerifierObservations/verifierObservations.controller';
import employmentVerificationReportRoutes from './modules/EmployeeVerificationReport/employeeVerificationReport.controller';
import customerContactReportRoutes from './modules/CustomerContactSupport/customerContactSupport.controller';
import authRoutes from './modules/auth/auth';
import { authenticateToken } from './modules/auth/auth';

const router = express.Router();

router.get('/', (req, res) => {
  res.send('API is working');
});

// Public routes
router.use('/auth', authRoutes);

// Protected routes
router.use('/application-registration', authenticateToken, applicationRegistrationRoutes);
router.use('/verifier-observations', authenticateToken, verifierObservationsRoutes);
router.use('/employment-verification-report', authenticateToken, employmentVerificationReportRoutes);
router.use('/customer-contact-report', authenticateToken, customerContactReportRoutes);

export default router;