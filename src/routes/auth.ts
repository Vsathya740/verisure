import { Router, RequestHandler, Request, Response } from 'express';
import { AuthService } from '../utils/auth';
import bcrypt from 'bcryptjs';

const router = Router();

// Login endpoint
router.post('/login', (async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // TODO: Replace with your user authentication logic
    // This is just an example
    const user = {
      id: 1,
      email: 'user@example.com',
      password: await bcrypt.hash('password123', 10)
    };

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate tokens
    const tokens = AuthService.generateTokens({
      userId: user.id,
      email: user.email
    });

    res.json({
      message: 'Login successful',
      ...tokens
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}) as RequestHandler);

// Refresh token endpoint
router.post('/refresh-token', (async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      return res.status(400).json({ message: 'Refresh token is required' });
    }

    const accessToken = AuthService.refreshAccessToken(refreshToken);

    res.json({
      message: 'Token refreshed successfully',
      accessToken
    });
  } catch (error) {
    console.error('Refresh token error:', error);
    res.status(401).json({ message: 'Invalid refresh token' });
  }
}) as RequestHandler);

export default router; 