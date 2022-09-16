import React, { useState, useMemo, useEffect } from "react";
import { Box, Input, Button, Icon, useStore } from "zmp-framework/react";
import ProductList from "./product-list";
import store from "../store";
import "../css/inquiry.scss";

const Inquiry = () => {
  const productList = useStore("products");

  const [selectedCategory, setSelectedCategory] = useState();

  useEffect(() => {
    store.dispatch("fetchProducts");
  }, [selectedCategory]);

  function filterProducts() {
    if (!selectedCategory) {
      return productList;
    }
    return productList.filter((item) => item._id === selectedCategory);
  }

  let filteredList = useMemo(filterProducts, [selectedCategory, productList]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <Box className="inquiry" px="2">
      <div className="flex-1 pr-4">
        <Input type="select">
          {filteredList.map(({ _id: name }) => (
            <option key={name} value={name} onChange={handleCategoryChange}>
              {name}
            </option>
          ))}
        </Input>
      </div>
      <div className="product-row">
        {filteredList.map(({ _id: name }) => (
          <ProductList {...name} key={name} value={name} />
        ))}
      </div>
    </Box>
  );
};

Inquiry.displayName = "zmp-inquiry";

export default Inquiry;
