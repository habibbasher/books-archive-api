/**
 * Importing node modules
 */
import express from 'express';
const router = express.Router();
import jwt from 'jsonwebtoken';
/**
 * Importing custom modules
 */
import User from '../models/User';
import { sendResetPasswordEmail } from '../mailer';

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

router.post("/reset_password_request", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if(user) {
      sendResetPasswordEmail(user);
      res.json({});
    } else {
      res.status(400).json({ errors: { global: "There is no user with such email" } });
    }
  })
});

router.post("/validate_token", (req, res) => {
  jwt.verify(req.body.token, process.env.JWT_SECRET, err => {
    if (err) {
      res.status(401).json({});
    } else {
      res.json({});
    }
  })
});

router.post("/reset_password", (req, res) => {
  const { password, token } = req.body.data;
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401).json({ errors: { global: "Invalid token" } });
    } else {
      User.findOne({ _id: decoded._id }).then(user => {
        if (user) {
          user.setPassword(password);
          user.save().then(() => res.json({}));
        } else {
          res.status(404).json({ errors: { global: "Invalid token" } });
        }
      });
    }
  })
});



export default router;
