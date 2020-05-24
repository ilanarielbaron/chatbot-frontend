import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "users/";

export function getTransactions(response) {
  const userId = response.data.id;
  const bearer = "Bearer " + response.data.token;
  return fetch(baseUrl + userId + "/transactions", {
    method: "GET",
    headers: { Authorization: bearer }
  })
    .then(handleResponse)
    .catch(handleError);
}

export function saveTransaction(transaction, response) {
  const userId = response.data.id;
  const bearer = "Bearer " + response.data.token;
  return fetch(baseUrl + userId + "/transactions", {
    method: "POST", // POST for create
    headers: { "content-type": "application/json", Authorization: bearer },
    body: JSON.stringify({ ...transaction, ...userId }),
  })
    .then(handleResponse)
    .catch(handleError);
}
