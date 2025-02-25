import axios from "axios";

export const TeacherService = {
  getStudentData: async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await axios.get(
        "http://localhost:5000/api/users/students",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Return student data
    } catch (error) {
      console.error("Error fetching student data:", error);
      throw error; // TODO:: Handle errors properly in UI
    }
  },
};
