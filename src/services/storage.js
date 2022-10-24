import api from "zmp-sdk";

export const loadProductsFromCache = () =>
  new Promise((resolve) => {
    api.getStorage({
      keys: ["products"],
      success: ({ products }) => {
        if (products) {
          resolve(products);
        }
        resolve([]);
      },
      fail: (error) => {
        console.log("Failed to load products from cache. Details: ", error);
        resolve([]);
      },
    });
  });

export const saveProductsToCache = async (products) => {
  await api.setStorage({
    data: { products },
    fail: (error) =>
      console.log("Failed to save products to cache. Details: ", error),
  });
  return products;
};

export const loadUserFromCache = () =>
  new Promise((resolve) => {
    api.getStorage({
      keys: ["user"],
      success: ({ user }) => {
        if (user) {
          resolve(user);
        }
        resolve();
      },
      fail: (error) => {
        console.log("Failed to load user from cache. Details: ", error);
        resolve();
      },
    });
  });

export const saveUserToCache = async (user) => {
  await api.setStorage({
    data: { user },
    fail: (error) =>
      console.log("Failed to save user to cache. Details: ", error),
  });
  return user;
};
