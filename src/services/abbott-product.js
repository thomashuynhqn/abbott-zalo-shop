import config from "../config";
import store from "../store";

const base = "https://api.3anutrition.com";

export const request = async (method, url, data) => {
  const headers = { "Content-Type": "application/json" };
  const token = store.state.jwt;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return fetch(`${base}/${url}.json`, {
    method: method,
    body: JSON.stringify(data),
    headers,
  });
};

export const login = async (accessToken) => {
  try {
    const response = await (
      await request("POST", "user", {
        accessToken,
      })
    ).json();
    if (response.data.jwt) {
      store.dispatch("setJwt", response.data.jwt);
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Error logging in. Details: ", error);
    return false;
  }
};

export const getProductsByCategory = async () => {
  try {
    const response = await (await request("GET", "products")).json();
    return response.data;
  } catch (error) {
    console.log("Error fetching products. Details: ", error);
    return [];
  }
};

export const checkout = async (payload) => {
  try {
    const response = await request("POST", "orders/checkout", payload);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error placing an order. Details: ", error);
    return false;
  }
};

export const getPlacedOrders = async () => {
  try {
    const response = await (await request("GET", "orders/history")).json();
    return response.data ?? [];
  } catch (error) {
    console.log("Error fetching placed orders. Details: ", error);
    return [];
  }
};
