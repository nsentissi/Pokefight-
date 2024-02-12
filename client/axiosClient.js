import axios from "axios"


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKENDURL || ""}/api`,
})

export default axiosClient