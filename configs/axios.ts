import axios from "axios";

let isRefreshing = false;
let refreshSubscribers = [];

const axiosReq = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

axiosReq.interceptors.request.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response.status === 401) {
      const originalRequest = error.config;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          await axiosReq.post("/auth/refresh");
          return axiosReq(originalRequest);
        } catch (error) {
          return Promise.reject(error);
        } finally {
          isRefreshing = false;
        }
      } else {
        return new Promise((resolve) => {
          refreshSubscribers.push(() => {
            resolve(axiosReq(originalRequest));
          });
        });
      }
    }
    return Promise.reject(error);
  }
);

export { axiosReq as axios };
