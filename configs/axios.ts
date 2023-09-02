import axios from "axios";

const axiosReq = axios.create({
  baseURL: "/api",
});

export { axiosReq as axios };
