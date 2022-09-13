import React from "react";
import { Page } from "zmp-framework/react";
import Heading from "../components/heading";
import Banner from "../components/banner";
import Inquiry from "../components/inquiry";
import ProductList from "../components/product-list";
import SearchFilterProduct from "../components/item-sorting";

const HomePage = () => {
  return (
    <Page name="home">
      <Inquiry />
      <SearchFilterProduct />
      <ProductList />
    </Page>
  );
};
export default HomePage;
