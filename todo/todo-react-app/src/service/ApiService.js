import { API_BASE_URL } from "../api-config";

export function call(api, method, request) {
    let options = {
        headers: new Headers({
            "Content-Type": "application/json",
        }),
        url:API_BASE_URL + api,
        method: method,
    };
    if(request) {
        options.body = JSON.stringify(request);
    }

    return fetch(options.url, options)
    .then((response) => 
        response.json().then((json) => {
            if(!response.ok){
                return Promise.reject(json);
            }
            return json;
        })
        ).catch((error) => {
            console.log(error.status);
            if(error.status === 403){
                window.location.href = "/login";
            }
        });
}

export function signin(userDTO) {
    console.log(userDTO);
    return call("/auth/signin", "POST", userDTO)
        .then((response) => {
            console.log("response : ", response);
            alert("Login Token : " + response.token);
        });
}