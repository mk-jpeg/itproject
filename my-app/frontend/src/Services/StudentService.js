import axios from "axios";

export const StudentService = {
  submitGameAttempt: async (gameType, score) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No authentication token found.");

      const response = await axios.post(
        "http://localhost:5000/api/student/play",
        { gameType, score },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error("Error submitting game attempt:", error);
      throw error;
    }
  },
};
