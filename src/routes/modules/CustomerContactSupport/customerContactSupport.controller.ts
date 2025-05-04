import express, { Request, Response } from 'express';
import { CustomerContactSupportService } from './customerContactSupport.service';

const router = express.Router();
const contactService = new CustomerContactSupportService();

// Validation middleware
const validateContactData = (req: Request, res: Response, next: Function): void => {
  const { customer_name, contact_date, contact_type, description, status } = req.body;

  if (!customer_name || !contact_date || !contact_type || !description || !status) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  next();
};

router.post('/', validateContactData, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await contactService.createContactReport(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await contactService.getContactReports();
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const data = await contactService.getContactReportById(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', validateContactData, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const data = await contactService.updateContactReport(id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const data = await contactService.deleteContactReport(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;