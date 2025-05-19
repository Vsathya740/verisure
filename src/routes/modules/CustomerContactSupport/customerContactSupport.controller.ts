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

router.get('/', async (_: Request, res: Response): Promise<void> => {
  try {
    const contacts = await contactService.getContactReports();
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts' });
  }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await contactService.getContactReportById(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', validateContactData, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await contactService.updateContactReport(id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await contactService.deleteContactReport(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;