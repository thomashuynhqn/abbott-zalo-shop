import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Input,
  Col,
  Title,
  Row,
  SkeletonBlock,
  useStore,
} from "zmp-framework/react";

import store from "../store";

const Userheading = () => {
  const userList = useStore("user");
  const [user, setUser] = useState([]);

  useEffect(() => {
    setUser(userList);
  }, []);

  console.log(store.state.user);

  return <Box>Hi,</Box>;
};

Userheading.displayName = "zmp-user-heading";

export default Userheading;
