import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createQuiz = async (formData: any) => {
  const res = await axios.post("/api/quiz/add/", formData);
  return res.data;
};
