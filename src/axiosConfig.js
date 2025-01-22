import axios from "axios";

// Tạo một instance của axios
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL gốc từ file .env
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Interceptor để xử lý trước khi gửi request
instance.interceptors.request.use(
  (config) => {
    // Lấy token từ localStorage
    const token = localStorage.getItem("access_token");
    console.log("token", token);
    if (token) {
      config.headers["Authorization"] = token; // Thêm token vào header nếu có
    }
    console.log("config", config);
    return config;
  },
  (error) => {
    // Xử lý lỗi trong request
    console.log("lỗi");
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response
instance.interceptors.response.use(
  (response) => {
    // Kiểm tra và xử lý trường hợp refresh token hết hạn
    if (
      response.data &&
      response.data.message === "Refresh token expired. Require login again"
    ) {
      // Xóa token và điều hướng người dùng đến trang đăng nhập
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("auth");
      window.location.href = "/login";
    }
    return response.data; // Trả về dữ liệu response
  },
  async (error) => {
    const originalConfig = error.config;

    // Kiểm tra nếu lỗi là 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      const errorMessage = error.response.data.message;

      // Trường hợp access token đã hết hạn
      if (errorMessage === "Access token expired") {
        try {
          // Lấy refresh token từ localStorage
          const refresh_token = localStorage.getItem("refresh_token");

          // Gửi request để lấy access token mới
          const { data } = await axios.post(
            `${process.env.REACT_APP_API_URL}/auth/refresh-token`,
            { refreshToken: refresh_token }
          );

          if (data.access_token) {
            // Lưu token mới vào localStorage
            localStorage.setItem("access_token", data.access_token);

            // Cập nhật header Authorization với token mới
            originalConfig.headers["Authorization"] = data.access_token;

            // Gửi lại request gốc
            return instance(originalConfig);
          }
        } catch (refreshError) {
          // Nếu refresh token không hợp lệ hoặc hết hạn, logout người dùng
          localStorage.removeItem("access_token");
          localStorage.removeItem("refresh_token");
          localStorage.removeItem("auth");
          window.location.href = "/login";
          return Promise.reject(refreshError);
        }
      }
    }

    // Trả về lỗi nếu không phải lỗi 401 hoặc không xử lý được
    return Promise.reject(error);
  }
);

export default instance;
