import React from "react";
import api from "zmp-sdk";
import {
  Avatar,
  Text,
  Button,
  List,
  ListItem,
  useStore,
} from "zmp-framework/react";
import abbott from "../static/images/abbott.png";
import config from "../config";
import { follow } from "../services/zalo";

export const FollowOrMessage = () => {
  const user = useStore("user");

  const message = () => {
    api.openProfile({
      type: "oa",
      id: config.OA_ID,
      success: () => {},
      fail: () => {},
    });
  };

  if (!user) return null;

  return (
    <>
      {user.isFollowing ? (
        <Button className="ml-4" fill onClick={message}>
          Nhắn tin
        </Button>
      ) : (
        <Button typeName="secondary" className="ml-4" onClick={follow}>
          Theo dõi
        </Button>
      )}
    </>
  );
};

const Heading = () => {
  const selectedShop = useStore("selectedShop");

  return (
    <List className="m-0">
      <ListItem>
        <Avatar src={abbott} />
        <div className="ml-4 flex-1">
          <Text bold className="mb-0">
            Gian Hàng Abbott Chính Hãng
          </Text>
          <Text className="ellipsis mb-0">
            {selectedShop.name} - {selectedShop.address}
          </Text>
        </div>
        <FollowOrMessage />
      </ListItem>
    </List>
  );
};

Heading.displayName = "zmp-heading";

export default Heading;
