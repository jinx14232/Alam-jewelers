const API_URL = import.meta.env.VITE_API_URL;

export function apiFetch(endpoint, options = {}){
    console.log(API_URL, endpoint)
    return fetch(`${API_URL}${endpoint}`, options);

};