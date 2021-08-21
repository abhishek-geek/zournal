import bcrypt from "bcrypt";
import Joi, { ValidationResult } from "joi";
import mongoose, { Document, Schema } from "mongoose";
import jwt from "jsonwebtoken";

interface IUserInput {
  name: string;
  email: string;
  password: string;
}

export interface IUser extends IUserInput, Document {
  comparePassword(password: string): Promise<boolean>;
  hashPassword(): Promise<void>;
  generateAuthToken(): string;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

userSchema.methods.hashPassword = async function () {
  this.password = await bcrypt.hash(this.password, 10);
};

userSchema.methods.generateAuthToken = function (): string {
  const token = jwt.sign(
    {
      _id: String(this._id),
      name: this.name,
      email: this.email,
    },
    "zournal"
  );

  return token;
};

export function validateUser(user: IUserInput): ValidationResult {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });
  return schema.validate(user, { stripUnknown: true, abortEarly: true });
}

const User = mongoose.model<IUser>("user", userSchema);

export default User;
