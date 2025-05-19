import express, { Request, Response } from 'express';
import { ApplicationRegistrationService } from './ApplicationRegistration/applicationRegistration.service';

interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
  };
}

const router = express.Router();
const applicationService = new ApplicationRegistrationService();

// Get all applications
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const applications = await applicationService.getApplications();
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Get single application
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const application = await applicationService.getApplicationById(id);
    res.status(200).json(application);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Create new application
router.post('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await applicationService.createApplication(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update application
router.put('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await applicationService.updateApplication(id, req.body);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Delete application
router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await applicationService.deleteApplication(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Accept application
router.post('/:id/accept', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    const data = await applicationService.acceptApplication(id, userId);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Complete application
router.post('/:id/complete', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ error: 'User not authenticated' });
      return;
    }
    const data = await applicationService.completeApplication(id, userId);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router; 