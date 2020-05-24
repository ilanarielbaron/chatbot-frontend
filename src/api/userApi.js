import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL;

export function register(userData) {
  return fetch(baseUrl + "register", {
    method: "POST", // POST for create
    headers: { "content-type": "application/json" },
    body: JSON.stringify({...userData})
  })
    .then(handleResponse)
    .catch(handleError);
}

export function login(userData) {
  return fetch(baseUrl + "login", {
    method: "POST", // POST for create
    headers: { "content-type": "application/json" },
    body: JSON.stringify({...userData})
  })
    .then(handleResponse)
    .catch(handleError);
}

export function updateCurrency(defaultCurrency, response) {
  const userId = response.data.id;
  const bearer = "Bearer " + response.data.token;
  return fetch(baseUrl + "users/" + userId + "/set-currency", {
    method: "PATCH",
    headers: { 'Content-Type':'application/json', Authorization: bearer },
    body: JSON.stringify({...defaultCurrency})
  })
    .then(handleResponse)
    .catch(handleError);
}
