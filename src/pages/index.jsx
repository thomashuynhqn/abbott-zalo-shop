import React from "react";
import { Page } from "zmp-framework/react";
import Heading from "../components/heading";
import Banner from "../components/banner";
import Inquiry from "../components/inquiry";
import ProductList from "../components/product-list";

const HomePage = () => {
  return (
    <Page name="home">
      <Inquiry />
    </Page>
  );
};
export default HomePage;
