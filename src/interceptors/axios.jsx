import axios from "axios";

axios.defaults.baseURL = "https://localhost:44320/api/"

let refresh = false

axios.interceptors.response.use(res => res, async error => {
    if(error.response.status === 401 && !refresh){
        refresh = true

        const response = await axios.post("Auth/RefreshToken", {}, { withCredentials: true })

        if(response.status === 200){
            axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.refreshToken}`

            return axios(error.config)
        }
    }

    refresh = false
    return error
})