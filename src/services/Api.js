import axios from "axios";

const baseUrl = "http://127.0.0.1:8091/"
const instance = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    params: {} // do not remove this, its added to add params later in the config
});
instance.interceptors.request.use((config) => {
    if (localStorage.getItem("userToken") != null) {
        config.headers.Authorization = "Bearer " + localStorage.getItem("userToken");
    }
    return config
})

export default {

    login(username, password) {
        return instance.post(baseUrl + "auth/login", {
            username: username,
            password: password

        })
    },
    getGameInfo(gameId) {
        return instance.get(baseUrl + "game?gameId=" + gameId);
    },
    getYunDownloadInfo(gameId) {
        return instance.get(baseUrl + "game/getYunDownLoadLink?gameId=" + gameId);
    },
    requestDownloadLink(gameId) {
        return instance.get(baseUrl + "game/download?gameId=" + gameId);
    },
    requestS3UnzipPassword(gameId){
        return instance.get(baseUrl +"game/getS3UnzipPassword?gameId="+gameId)
    }

}

