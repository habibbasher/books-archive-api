/**
 * Importing node modules
 */
import express from 'express';
const router = express.Router();
/**
 * Importing custom modules
 */
import User from '../models/User';

router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOne({ email: credentials.email }).then((user) => {
    if (user && user.isValidPassword(credentials.password)) {
      res.status(200).json({ user: user.toAuthJSON() });
    } else {
      console.log(`User not found.`);
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });

});

router.post("/confirmation", (req, res) => {
  const token = req.body.token;
  User.findOneAndUpdate({ confirmationToken: token }, { confirmationToken: "", confirmed: true }, { new: true })
  .then(user =>
    user ? res.json({ user: user.toAuthJSON() }): res.status(400).json({})
  );
});

export default router;
