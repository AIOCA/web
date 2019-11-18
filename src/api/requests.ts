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
        method: "post"
    })

    console.log(response.text);
    if (response.ok) {
        let data = await response.json();
        return data
    }
    return null
}

async function SendGetRequest(url: string) {
    let response: Response;
    response = await fetch(url)

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

/// !! NOT YET IMPLEMENTED IN BACKEND
export async function CommutePaths(distance:number,token:string) {
    let json = {
        distance:distance,
        token:token
    };
    return SendRequest("/commute/estimate", json);
}

//   21
export async function GetStreetName(token:string) {
    let link = "https://nominatim.openstreetmap.org/search/"+token+"?format=json";
    return SendGetRequest(link);
}
//http://www.yournavigation.org/api/1.0/gosmore.php?flat=28.6337465&flon=77.35780799999999&tlat=28.6388179&tlon=77.3606496&format=geojson

export async function GetPath(green: number[], red: number[]) {
    let json = {
        start_lat: green[0],
        stop_lat: red[0],
        start_long: green[1],
        stop_long: red[1]
    };
    return SendRequest("/commute/route", json);
}

export async function IsVerified(token:string) {
    let json = {
        token: token
    };
    return SendRequest("/user/verification/isverified", json);
}

export async function Verify(token:string,code:string) {
    let json = {
        token: token,
        code:code
    };
    return SendRequest("/user/verification/verify", json);
}