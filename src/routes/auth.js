import express from 'express';
const router = express.Router();

import User from '../models/User';

router.post("/", (req, res) => {
  const { credentials } = req.body;
  User.findOneAsync({ email: credentials.email }).then((user) => {
    if (user && user.isValidPassword(credentials.password)) {
      res.status(200).json({ user: user.toAuthJSON() });
    } else {
      console.log(`User not found.`);
      res.status(400).json({ errors: { global: "Invalid credentials" } });
    }
  });

});


export default router;
