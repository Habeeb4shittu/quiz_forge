import mongoose, { Schema, Document } from "mongoose";

interface IQuestion extends Document {
  quiz_id: Schema.Types.ObjectId;
  questionsAndAnswers: {
    text: string;
    choices: string[];
    correctAnswerIndex: number;
    explanation?: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema = new Schema<IQuestion>(
  {
    quiz_id: { type: Schema.Types.ObjectId, ref: "Quiz", required: true },
    questionsAndAnswers: [
      {
        text: { type: String, required: true }, // e.g., "What is the capital of France?"
        choices: [{ type: String, required: true }], // e.g., ["Paris", "London", "Berlin", "Madrid"]
        correctAnswerIndex: { type: Number, required: true }, // 0-based index
        explanation: { type: String, optional: true },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Question ||
  mongoose.model<IQuestion>("Question", QuestionSchema);
