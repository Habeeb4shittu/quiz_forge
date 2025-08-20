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
