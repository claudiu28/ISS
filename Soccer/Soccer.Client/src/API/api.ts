import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5001/api",
});

api.interceptors.request.use(
    (config ) => {
        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");
        if(token){
            config.headers = config.headers || {};
            config.headers.Authorization = `Bearer ${token}`;
            if (user){
                const parsedUser = JSON.parse(user);
                config.headers.Username = parsedUser.username;
                config.headers.Roles = parsedUser.roles.join(",");
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("roles");
            window.location.href = "/";
        }
        return Promise.reject(error);
    }
);

export default api;