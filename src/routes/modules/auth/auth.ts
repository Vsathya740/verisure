import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const router = express.Router();

// Sample in-memory user (for demo purposes)
const mockUser = {
  id: 1,
  username: 'admin',
  password: bcrypt.hashSync('password', 8), // hashed password
};

// @ts-ignore
router.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (username !== mockUser.username || !bcrypt.compareSync(password, mockUser.password)) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // @ts-ignore
  const token = jwt.sign(
    { id: mockUser.id, username: mockUser.username },
    process.env.JWT_SECRET || 'your-secret-key',
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );

  res.json({ token });
});

// Authentication middleware
export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ message: 'Access token is required' });
    return;
  }

  // @ts-ignore
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err: any, user: any) => {
    if (err) {
      res.status(403).json({ message: 'Invalid token' });
      return;
    }
    // @ts-ignore
    req.user = user;
    next();
  });
};

// Optionally you can add logout functionality using token blacklisting or client-side handling

export default router;
