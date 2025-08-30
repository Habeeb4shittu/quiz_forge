import axios from "axios";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createQuiz = async (formData: any) => {
  const res = await axios.post("/api/quiz/add/", formData);
  return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const updateQuiz = async (formData: any) => {
  const res = await axios.patch("/api/quiz/update/", formData);
  return res.data;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deleteQuiz = async (quizId: string) => {
  const res = await axios.request({
    url: "/api/quiz/delete/",
    method: "DELETE",
    data: { quizId },
  });
  return res.data;
};
