import Joi, { ValidationResult } from "joi";
import mongoose, { Document, Schema } from "mongoose";

interface IJournalInput {
  date: Date;
  content: string;
  author: Schema.Types.ObjectId;
}

export interface IJournal extends IJournalInput, Document {}

const journalSchema = new Schema<IJournal>({
  date: {
    type: Date,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

export function validateJournal(journal: IJournalInput): ValidationResult {
  const schema = Joi.object({
    date: Joi.string().required(),
    content: Joi.string().required(),
  });
  return schema.validate(journal, { stripUnknown: true, abortEarly: true });
}

const Journal = mongoose.model<IJournal>("journal", journalSchema);

export default Journal;
