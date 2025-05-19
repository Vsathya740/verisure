import express, { Request, Response } from 'express';
import { EmployeeVerificationReportService } from './employeeVerificationReport.service';

const router = express.Router();
const verificationService = new EmployeeVerificationReportService();

// Validation middleware
const validateVerificationData = (req: Request, res: Response, next: Function): void => {
  const { employee_name, company_name, designation, employment_status, verification_date, remarks } = req.body;

  if (!employee_name || !company_name || !designation || !employment_status || !verification_date || !remarks) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  next();
};

router.post('/', validateVerificationData, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await verificationService.createVerificationReport(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (_: Request, res: Response): Promise<void> => {
  try {
    const reports = await verificationService.getVerificationReports();
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching verification reports' });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await verificationService.getVerificationReportById(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', validateVerificationData, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await verificationService.updateVerificationReport(id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await verificationService.deleteVerificationReport(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;