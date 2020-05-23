import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function login() {
  return fetch(baseUrl + "login")
    .then(handleResponse)
    .catch(handleError);
}

export function register(userData) {
  return fetch(baseUrl + "register", {
    method: "POST", // POST for create
    headers: { "content-type": "application/json" },
    body: JSON.stringify({...userData})
  })
    .then(handleResponse)
    .catch(handleError);
}
