import { notifications } from "@mantine/notifications";
import axios from "axios";

export const axiosInstance = axios.create({
});

axiosInstance.interceptors.response.use((response) => {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, (error) => {
  notifications.show({
    title: "Error",
    message: error.error
  })
  return Promise.reject(error);
});
