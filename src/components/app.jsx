import React from "react";
import { useEffect } from "react";
import { zmpready, App, View } from "zmp-framework/react";
import store from "../store";
import api from "zmp-sdk";
import { getUser, getPhoneNumber } from "../services/zalo";
import BottomNavigation from "./bottom-navigation";

const MyApp = () => {
  // ZMP Parameters
  const zmpparams = {
    name: "Gian Hàng Abbott Chính Hãng", // App name
    theme: "auto", // Automatic theme detection
    // App store
    store: store,
  };

  zmpready(() => {
    // Call ZMP APIs here
    store.dispatch("login");
  });

  const init = async () => {
    await api.login();
    getUser();
    getPhoneNumber();
  };

  useEffect(() => {
    init();
  }, []);

  return (
    <App {...zmpparams}>
      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />
      <BottomNavigation />
    </App>
  );
};
export default MyApp;
