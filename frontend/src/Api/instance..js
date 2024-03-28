import axios from "axios"

const instance = axios.create({
    baseURL:"https://mf360backend.onrender.com/api/",
});
export default instance