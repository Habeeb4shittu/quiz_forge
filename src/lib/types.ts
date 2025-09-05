export type ApiResponse = {
  message: string;
  status: string;
  userId?: string;
};

export interface QuizUser {
  _id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
}

export interface Quiz {
  _id: string;
  author_id: string;
  title: string;
  description: string;
  category_id: string;
  difficulty: "easy" | "medium" | "hard";
  time_limit: number;
  number_of_questions: number;
  tags: string[];
  icon: string;
  private: boolean;
}

export interface Question {
  text: string;
  choices: string[];
  correctAnswerIndex: number;
  explanation?: string;
}
