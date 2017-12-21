/**
 * Importing node modules
 */
import mongoose from 'mongoose';
import Promise from 'bluebird';
mongoose.Promise = Promise;
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import uniqueValidater from 'mongoose-unique-validator';

/**
 * Defining mongoose schema
 */
const schema = new mongoose.Schema({
  email: { type: String, required: true, lowercase: true, index: true, unique: true },
  passwordHash: { type: String, required: true },
  confirmed: { type: Boolean, default: false },
  confirmationToken: { type: String, default: "" }
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
}

schema.methods.setConfirmationToken = function setConfirmationToken(password) {
  this.confirmationToken = this.generateJWT();
}

schema.methods.generateConfirmationUrl = function generateConfirmationUrl() {
  return `${process.env.HOST}/confirmation/${this.confirmationToken}`;
}

schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '1h'
    }
  );
}

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    confirmed: this.confirmed,
    token: this.generateJWT()
  };
};

schema.plugin(uniqueValidater, { message: "This emil is already taken" });

export default mongoose.model('User', schema);
