import store from "../store";
import api from "zmp-sdk";

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
    const response = await api.login({
      accessToken,
    });
    return response.data;
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

export const getProvince = async () => {
  try {
    const response = await fetch(
      "https://api.3anutrition.com/api/citylist?city=0&district=0"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.log("Error fetching products. Details: ", error);
    return [];
  }
};

export const getDistrict = async () => {
  try {
    const response = await fetch(
      "https://api.3anutrition.com/api/citylist?city=T%E1%BB%89nh%20Th%C3%A1i%20B%C3%ACnh&district=0"
    );
    const data = await response.json();
    return data;
  } catch (error) {
    return false;
  }
};
