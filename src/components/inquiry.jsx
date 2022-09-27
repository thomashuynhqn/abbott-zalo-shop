import React, { useState, useMemo, useEffect } from "react";
import { Box, Input, Button, Icon, Col, useStore } from "zmp-framework/react";
import ProductList from "./product-list";
import Product from "./product";
import store from "../store";
import "../css/inquiry.scss";

const Inquiry = () => {
  const itemApi = useStore("products");
  const [itemList, setItemList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    setItemList(itemApi);
  });

  useEffect(() => {
    store.dispatch("fetchProducts");
  }, []);

  function getFilteredList() {
    if (!selectedCategory) {
      return itemList;
    }
    return itemList.filter((product) => product.category === selectedCategory);
  }

  const filteredList = useMemo(getFilteredList, [selectedCategory, itemList]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  console.log(store.state.products);

  return (
    <Box className="inquiry" px="2">
      <div className="flex-1 pr-4">
        <select
          name="category-list"
          id="category-list"
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          <option value="Ensure Gold">Ensure Gold</option>
          <option value="Glucerna">Glucerna</option>
          <option value="PediaSure">PediaSure</option>
        </select>
      </div>
      {filteredList.map((element, product) => (
        <div key={product} className="product-row">
          <ProductList {...element} />
        </div>
      ))}
    </Box>
  );
};

Inquiry.displayName = "zmp-inquiry";

export default Inquiry;
