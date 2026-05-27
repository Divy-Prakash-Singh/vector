import api  from "../lib/api.js";

export const getDashboard = async () => {
  const response = await api.get("/api/dashboard");

  return response.data.data;
};