///import cookie from "react-cookies";

const API_HOST = "localhost";
const API_PORT = "8000";
const END_POINT = "http://" + API_HOST + ":" + API_PORT;

//A basic Cookie option structure
//contains information regarding expire date etc..
export const COOKIE_OPTIONS: {
    path?: string;
    expires?: Date;
    maxAge?: number;
    domain?: string;
    secure?: boolean;
    httpOnly?: boolean;
} = {
    path: API_HOST,
    domain: API_HOST
};

async function SendRequest(url: string, json_data: {}) {
    let response: Response;
    response = await fetch(END_POINT + url, {
        body: JSON.stringify(json_data),
        method: 'post'
    })

    if (response.ok) {
        let data = await response.json();
        return data
    }
    return null
}

//API requests

//Send auth info and logs in user by fetching a token
//TODO: add method to handle admin users
//TODO: store admin status in cookie
export async function AuthRequest(name: string, password: string) {
    let json = {
        name: name,
        password: password
    };
    return SendRequest("/user/auth", json);
}

export async function UserRegister(user_name: string, display_name: string, password: string, email: string, address: string) {
    let json = {
        user_name: user_name,
        display_name: display_name,
        password: password,
        email: email,
        address: address
    };
    return SendRequest("/user/register", json);
}
