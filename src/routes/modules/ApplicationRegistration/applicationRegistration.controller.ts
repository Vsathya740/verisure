import express, { Request, Response } from 'express';
import { ApplicationRegistrationService } from './applicationRegistration.service';
import { authenticateToken } from '../auth/auth';
import { uploadToS3, getSignedDownloadUrl, listApplicationFiles } from '../../../utils/s3';
import multer from 'multer';

// Extend Express Request type to include user and file
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    userId: number;
  };
  file?: Express.Multer.File;
}

const router = express.Router();
const applicationService = new ApplicationRegistrationService();

// Configure multer for file uploads
const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
});

// Validation middleware
const validateApplicationData = (req: Request, res: Response, next: Function): void => {
  const { applicant_name, dob, bank_branch, phone_number, email_id } = req.body;

  if (!applicant_name || !dob || !bank_branch || !phone_number || !email_id) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }
  next();
};

// Get all applications (filtered by status)
router.get('/', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.userId;
    const applications = await applicationService.getApplications(userId);
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching applications' });
  }
});

// Get single application
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const data = await applicationService.getApplicationById(id);
    res.status(200).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Create new application
router.post('/', validateApplicationData, async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await applicationService.createApplication(req.body);
    res.status(201).json(data);
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Update application
router.put('/:id', validateApplicationData, async (req: Request, res: Response): Promise<void> => {
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
router.post('/:id/accept', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const userId = req.user?.userId;
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
router.post('/:id/complete', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const userId = req.user?.userId;
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

// Upload file for an application
router.post('/:id/upload', authenticateToken, upload.single('file'), async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const file = req.file;

    if (!file) {
      res.status(400).json({ error: 'No file uploaded' });
      return;
    }

    const key = await uploadToS3(
      parseInt(id),
      file.buffer,
      file.originalname,
      file.mimetype
    );

    res.status(200).json({
      message: 'File uploaded successfully',
      key
    });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// Get download URL for a file
router.get('/:id/files/:fileName/download', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const fileName = req.params.fileName;

    const signedUrl = await getSignedDownloadUrl(parseInt(id), fileName);
    res.status(200).json({ downloadUrl: signedUrl });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

// List all files for an application
router.get('/:id/files', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const id = req.params.id;
    const files = await listApplicationFiles(parseInt(id));
    res.status(200).json({ files });
  } catch (err: any) {
    res.status(400).json({ error: err.message });
  }
});

export default router;