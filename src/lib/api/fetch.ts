import axios from "axios";
export const fetchCategories = async () => {
  try {
    const response = await axios.get("/api/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const fetchAllMyQuizzes = async () => {
  try {
    const userId = JSON.parse(localStorage.getItem("user") || "")._id;
    if (!userId) {
      throw new Error("User ID not found in localStorage");
    }

    const response = await axios.get(`/api/quiz/get/${userId}`);
    return response.data;
  } catch (err) {
    console.error("Error fetching quizzes:", err);
    throw new Error("Failed to fetch quizzes");
  }
};
