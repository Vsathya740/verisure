import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserMaster } from '../../../sequelize/models/UserMaster';
import bcrypt from 'bcrypt';
import { AuthService } from '../../../utils/auth';

// Extend Express Request type to include user
interface AuthRequest extends Request {
  user?: {
    userId: number;
    email: string;
  };
}

const router = express.Router();

// Login endpoint
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ message: 'Email and password are required' });
      return;
    }

    const user = await UserMaster.findOne({ where: { email } });

    if (!user) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    // Use bcrypt to compare hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: 'Invalid credentials' });
      return;
    }

    const accessToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1h' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
        isActive: user.isActive,
        organisation_id: user.organisation_id,
        bank_id: user.bank_id,
        bank_branch_id: user.bank_branch_id
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Error during login' });
  }
});

// Refresh token endpoint
router.post('/refresh-token', async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    try {
      const payload = AuthService.verifyRefreshToken(refreshToken);
      const accessToken = AuthService.generateAccessToken(payload);

      res.json({
        accessToken,
        user: {
          userId: payload.userId,
          email: payload.email
        }
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(500).json({ message: 'Error refreshing token' });
  }
});

// Get new access token endpoint
router.post('/get-access-token', async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      res.status(400).json({ message: 'Refresh token is required' });
      return;
    }

    try {
      const payload = AuthService.verifyRefreshToken(refreshToken);
      const tokens = AuthService.generateTokens(payload);

      // Get user details
      const user = await UserMaster.findOne({ where: { id: payload.userId } });
      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
          isActive: user.isActive,
          organisation_id: user.organisation_id,
          bank_id: user.bank_id,
          bank_branch_id: user.bank_branch_id
        }
      });
    } catch (error) {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  } catch (error) {
    console.error('Get access token error:', error);
    res.status(500).json({ message: 'Error getting access token' });
  }
});

// Authentication middleware
export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token is required' });
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }
    req.user = user;
    next();
  });
};

// Optionally you can add logout functionality using token blacklisting or client-side handling

export default router;
