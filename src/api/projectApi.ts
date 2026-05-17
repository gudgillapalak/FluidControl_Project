import axios from "axios";

const PROJECT_API = axios.create({

  baseURL:
    `${import.meta.env.VITE_API_URL}/api/projects`,

});

/* =========================
   Attach JWT Token
========================= */

PROJECT_API.interceptors.request.use(
  (config) => {

    const user =
      JSON.parse(
        localStorage.getItem(
          "user"
        ) || "{}"
      );

    if (user?.token) {

      config.headers.Authorization =
        `Bearer ${user.token}`;
    }

    return config;
  }
);

export default PROJECT_API;