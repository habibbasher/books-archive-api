/**
 * Importing node modules
 */
import express from 'express';
const router = express.Router();
/**
 * Importing custom modules
 */
import User from '../models/User';
import parseErrors from '../utils/parseErrors';
import { sendConfimationEmail } from '../mailer';

router.post("/", (req, res) => {
  const { email, password } = req.body.user;

  const user = new User({ email });
  user.setPassword(password);
  user.setConfirmationToken();
  user.save()
  .then(userRecord => {
    sendConfimationEmail(userRecord);
    res.json({ user: userRecord.toAuthJSON() });
  })
  .catch(err => res.status(400).json({ errors: parseErrors(err.errors) }));

});

export default router;
