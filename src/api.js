const axios = require('axios');
const qs = require('qs');
const BASE_URL = "https://api.stya.net";

export default {
    register,
    login
};

/**
 * Register new user
 * @param username username
 * @param password password
 */
export async function register(username, password) {
    let param = {
        username: username,
        password: password
    };

    let response = await post_request(`${BASE_URL}/nim/register`, param);
    let data = response.data;

    if(data.code !== 0) throw data.status;
}

/**
 * Login
 * @param username
 * @param password
 * @returns Promise<String> token
 */
export async function login(username, password) {
    let param = {
        username: username,
        password: password
    };

    let response = await post_request(`${BASE_URL}/nim/login`, param);
    let data = response.data;

    if(data.code !== 0) throw data.status;
    else return data.token;
}

export async function by_name(auth_token, query, page = 0, count = 10) {
    let param = {
        name: query,
        page: page,
        count: count
    };

    let response = await get_request(`${BASE_URL}/nim/byname`, param, {
        'Auth-Token': auth_token
    });

    let data = response.data;

    if(data.code !== 2) throw data.status;
    else return data.payload;
}

export async function by_id(auth_token, query, page = 0, count = 10) {
    let param = {
        query: query,
        page: page,
        count: count
    };

    let response = await get_request(`${BASE_URL}/nim/byid`, param, {
        'Auth-Token': auth_token
    });

    let data = response.data;

    if(data.code !== 2) throw data.status;
    else return data.payload;
}

async function post_request(url, params, headers) {
    let payload = qs.stringify(params);

    let options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers
        }
    };

    return await axios.post(url, payload, options);
}

async function get_request(url, params, headers) {
    let payload = qs.stringify(params);

    let options = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            ...headers
        }
    };

    return await axios.get(url, payload, options);
}