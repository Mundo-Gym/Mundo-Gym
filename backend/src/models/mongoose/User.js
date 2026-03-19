const { Schema, model, models } = require('mongoose');

const userSchema = new Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, default: 'user' },
  resetPasswordToken: { type: String },
}, { timestamps: true });

module.exports = models.User || model('User', userSchema);
