import { handleResponse, handleError } from "./apiUtils";
const baseUrl = process.env.API_URL + "/users/";

export function getTransactions(userId) {
  const apiUrl = baseUrl + userId + "/transactions"
  return fetch(apiUrl)
    .then(handleResponse)
    .catch(handleError);
}

export function saveTransaction(transaction, userId) {
  return fetch(baseUrl + userId + "/transactions", {
    method: "POST", // POST for create
    headers: { "content-type": "application/json" },
    body: JSON.stringify({transaction, ...userId})
  })
    .then(handleResponse)
    .catch(handleError);
}
