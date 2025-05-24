import express, { Request, Response } from 'express';
import { CustomerContactSupportService } from './customerContactSupport.service';
import { authenticateToken } from '../auth/auth';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

const router = express.Router();
const contactService = new CustomerContactSupportService();

// Validation middleware
const validateContactData = (req: Request, res: Response, next: Function): void => {
  const { application_id, contact_date, contact_type, contact_details, outcome } = req.body;

  if (!application_id || !contact_date || !contact_type || !contact_details || !outcome) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  next();
};

router.post('/', authenticateToken, validateContactData, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const data = {
      ...req.body,
      created_by: req.user?.id
    };
    const report = await contactService.createContactReport(data);
    res.status(201).json(report);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    const reports = await contactService.getContactReports(userId);
    res.json(reports);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contact reports' });
  }
});

router.get('/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await contactService.getContactReportById(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', authenticateToken, validateContactData, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await contactService.updateContactReport(id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await contactService.deleteContactReport(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.patch('/:id/status', authenticateToken, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const { status } = req.body;
    if (!status || !['OPEN', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
      res.status(400).json({ error: 'Invalid status' });
      return;
    }
    const data = await contactService.updateStatus(id, status);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;