import { Router } from 'express';
import requireAuth from '../middleware/require-auth-middleware';

import { User } from '../models';
const router = Router();

// Register new users
router.post('/register', async (req, res) => {
  try {
    let user = await User.create(req.body);

    let data = await user.authorize();

    return res.json(data);
  } catch(err) {
    return res.status(400).send(err);
  }
});

// Login route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Request missing username or password');
  }

  try {
    let user = await User.authenticate(username, password);
    return res.json(user);
  } catch (err) {
    return res.status(400).send('invalid username or password');
  }
});

// Logout route
router.delete('/logout', async (req, res) => {
  const { user, cookies: { auth_token: authToken }} = req;

  if (user && authToken) {
    await req.user.logout(authToken);
    return res.status(204).send();
  }

  return res.status(400).send({ errors: [{ message: 'not authenticated' }]});
});

// Get current user
router.get('/me', requireAuth, (req, res) => {
  res.send(req.user);
});

export default router;

