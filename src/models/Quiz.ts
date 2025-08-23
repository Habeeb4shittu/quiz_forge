import mongoose, { Schema, Document } from "mongoose";

export interface IQuiz extends Document {
  author_id: Schema.Types.ObjectId;
  title: string;
  description: string;
  category_id: Schema.Types.ObjectId;
  difficulty: string;
  time_limit: string;
  number_of_questions: string;
  tags: string[];
  icon: string; // lucide-react icon name
  private: boolean;
}

const QuizSchema = new Schema<IQuiz>({
  author_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: { type: String, default: "" },
  category_id: { type: Schema.Types.ObjectId, ref: "Category", required: true },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "medium",
  },
  time_limit: { type: String, default: "0" }, // in minutes, 0 means no limit
  number_of_questions: { type: String, default: "10" },
  tags: { type: [String], default: [] },
  icon: { type: String, default: "BookOpen" }, // default icon if none
  private: { type: Boolean, default: false },
});

export default mongoose.models.Quiz ||
  mongoose.model<IQuiz>("Quiz", QuizSchema);
