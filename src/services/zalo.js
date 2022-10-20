import { zmp } from "zmp-framework/react";
import { zmpready } from "zmp-framework/react";
import api from "zmp-sdk";
import config from "../config";
import store from "../store";

export const getUser = () =>
  new Promise((resolve) => {
    api.getUserInfo({
      avatarType: "small",
      success: ({ userInfo }) => {
        zmpready(() => {
          store.dispatch("setUser", userInfo).then(resolve);
        });
      },
    });
  });

export const getPhoneNumber = () =>
  new Promise((resolve) => {
    api.getPhoneNumber({
      number: "",
      success: ({ number }) => {
        zmpready(() => {
          store.dispatch("setPhone", number).then(resolve);
        });
      },
    });
  });

export const getAccessToken = () =>
  new Promise((resolve) => {
    api.login({
      success: () => {
        api.getAccessToken({
          success: (token) => {
            if (
              token === "DEFAULT ACCESS TOKEN" &&
              config.DEFAULT_ACCESS_TOKEN
            ) {
              // eslint-disable-next-line no-param-reassign
              token = config.DEFAULT_ACCESS_TOKEN; // For testing purpose only
            }
            resolve(token);
          },
          fail: (error) => {
            console.error(error);
          },
        });
      },
      fail: (error) => {
        console.error(error);
      },
    });
  });

export const follow = () => {
  api.followOA({
    id: config.OA_ID,
    success: () => {
      store.dispatch("setUser", {
        ...store.state.user,
        isFollowing: true,
      });
      zmp.toast
        .create({
          text: "Cảm ơn bạn đã theo dõi OA thành công!",
          closeTimeout: 3000,
        })
        .open();
      // UpdateFollowStatus(true) // Không cần gửi status về backend vì mình đã có webhook
    },
    fail: (err) => {
      console.log("Failed to follow OA. Details: ", err);
    },
  });
};
