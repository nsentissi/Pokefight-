import axios from "axios"


const axiosClient = axios.create({
    baseURL: `${import.meta.env.VITE_BACKENDURL || ""}/api`,
    withCredentials:true
})

export default axiosClient