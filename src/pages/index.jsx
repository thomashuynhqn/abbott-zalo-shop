import React from "react";
import { Page } from "zmp-framework/react";
import Heading from "../components/heading";
import Banner from "../components/banner";
import Inquiry from "../components/inquiry";
import Userheading from "../components/user-heading";

const HomePage = () => {
  return (
    <Page name="home">
      <Userheading />
      <Inquiry />
    </Page>
  );
};
export default HomePage;
