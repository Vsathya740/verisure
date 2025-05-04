import express, { Request, Response } from 'express';
import { VerifierObservationsService } from './verifierObservations.service';

const router = express.Router();
const observationsService = new VerifierObservationsService();

// Validation middleware
const validateObservationData = (req: Request, res: Response, next: Function): void => {
  const { verifier_id, observation_date, observation_type, description, status } = req.body;

  if (!verifier_id || !observation_date || !observation_type || !description || !status) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  next();
};

router.post('/', validateObservationData, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await observationsService.createObservation(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await observationsService.getObservations();
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
    const data = await observationsService.getObservationById(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

router.put('/:id', validateObservationData, async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({ error: 'Invalid ID format' });
      return;
    }
    const data = await observationsService.updateObservation(id, req.body);
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
    const data = await observationsService.deleteObservation(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;