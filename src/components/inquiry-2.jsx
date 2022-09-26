import React, { useState, useMemo, useEffect } from "react";
import { Box, Input, Button, Icon, useStore } from "zmp-framework/react";
import ProductList from "./product-list";
import store from "../store";
import "../css/inquiry.scss";

const Inquiry = () => {
  const itemApi = useStore("products");
  const [productList, setProductList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  // useEffect(() => {
  //   store.dispatch("fetchProducts");
  // }, []);

  // const filterByBrand = (filteredData) => {
  //   if (!selectedCategory) {
  //     return filteredData;
  //   }
  //   const filteredProducts = filteredData.filter(
  //     (product) => product.products === selectedCategory
  //   );
  //   return filteredProducts;
  // };

  // const handleBrandChange = (event) => {
  //   setSelectedCategory(event.target.value);
  // };

  // useEffect(() => {
  //   let filteredData = filterByBrand("products");
  //   setProductList(filteredData);
  // }, [selectedCategory]);

  return (
    <Box className="inquiry" px="2">
      <div className="flex-1 pr-4">
        {productList.map((item) => (
          <Input type="select">
            <option
              key={item._id}
              value={item.catego}
              onChange={handleBrandChange}
            >
              {item.category}
            </option>
          </Input>
        ))}
      </div>
      <div className="product-row">
        {productList.map((element, index) => (
          <ProductList {...element} key={index} />
        ))}
      </div>
    </Box>
  );
};

Inquiry.displayName = "zmp-inquiry";

export default Inquiry;
