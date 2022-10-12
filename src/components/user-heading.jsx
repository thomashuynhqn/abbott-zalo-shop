import React from "react";
import {
  Box,
  Input,
  Col,
  Title,
  Row,
  SkeletonBlock,
  useStore,
  Avatar,
  Text,
} from "zmp-framework/react";

import store from "../store";

const Userheading = () => {
  const user = useStore("user");

  return (
    <Box mx="4" mb="4" mt="5">
      <Avatar className="shadow align-middle mb-2" src={user.avatar}>
        Hi
      </Avatar>
      <Text>{user.name ? <>Chào, {user.name}!</> : "..."}</Text>
    </Box>
  );
};

Userheading.displayName = "zmp-user-heading";

export default Userheading;
