import axiosClient from "./axiosClient";

const authApi  = {
    login (username: string, password: string) {
        const url = '/foodsun/login';
        return  axiosClient
            .post(url, {
                username,
                password
            })
            .then  ((response: any) => {
                if (response) {
                    console.log(response);
                    localStorage.setItem("token", response.data.token);
                    localStorage.setItem("roles", response.data.role);
                }
                return response;
            });
    }
}

export default authApi;