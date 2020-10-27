import { postForm } from "./utils/init.js";

const register = () => {
    postForm("registerUsers", "btn-registerUsers", '/api/users/register', (state, datas) => {
        if (state) {
            alert(datas.message);
            window.location.href = "/";
        }else {
            alert(datas.message)
        }
    })
}

export { register }