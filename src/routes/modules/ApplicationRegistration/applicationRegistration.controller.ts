import express, { Request, Response, NextFunction } from 'express';
import { ApplicationRegistrationService } from './applicationRegistration.service';

const router = express.Router();
const applicationService = new ApplicationRegistrationService();

// Validation middleware
const validateApplicationData = (req: Request, res: Response, next: NextFunction): void => {
  const { applicant_name, applicant_dob, person_met, relation_with_person, earning_members, residence_address, permanent_address, years_at_residence, address_confirmed_by, residents_count, phone, residence_status, approx_rent, approx_value_if_owned, designation, bank_id, vehicle_type, status_id, application_final_remarks } = req.body;

  if (!applicant_name || !applicant_dob || !person_met || !relation_with_person || !earning_members || !residence_address || !permanent_address || !years_at_residence || !address_confirmed_by || !residents_count || !phone || !residence_status || !approx_rent || !approx_value_if_owned || !designation || !bank_id || !vehicle_type || !status_id || !application_final_remarks) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  next();
};

router.post('/', validateApplicationData, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await applicationService.createApplication(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await applicationService.getApplications();
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
    const data = await applicationService.getApplicationById(id);
    if (!data) {
      res.status(404).json({ error: 'Application not found' });
      return;
    }
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', validateApplicationData, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const data = await applicationService.updateApplication(id, req.body);
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
    const data = await applicationService.deleteApplication(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;