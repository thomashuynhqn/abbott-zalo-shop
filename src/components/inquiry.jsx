import React, { useState, useMemo, useEffect } from "react";
import { Box, Input, Button, Icon, useStore } from "zmp-framework/react";
import ProductList from "./product-list";
import store from "../store";
import "../css/inquiry.scss";

const Inquiry = () => {
  const categories = useStore("categories");
  const productList = useStore("products");

  const [itemList, setItemList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    setItemList(productList);
  });

  useEffect(() => {
    store.dispatch("fetchProducts");
  }, []);

  function filterProducts() {
    if (!selectedCategory) {
      return itemList;
    }
    return itemList.filter((item) => item.category === selectedCategory);
  }

  let filteredList = useMemo(filterProducts, [selectedCategory, itemList]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <Box className="inquiry" px="2">
      <div className="flex-1 pr-4">
        <Input type="select">
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              onChange={handleCategoryChange}
            >
              {category}
            </option>
          ))}
        </Input>
      </div>
      <div className="product-row">
        {filteredList.map((index) => (
          <ProductList key={index._id} />
        ))}
      </div>
    </Box>
  );
};

Inquiry.displayName = "zmp-inquiry";

export default Inquiry;
