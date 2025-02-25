export const AuthService = {
  login: async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Invalid email or password.");
      }
      return data;
    } catch (error) {
      throw new Error(error.message || "Server error. Please try again later.");
    }
  },
};
