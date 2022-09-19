import React, { useState, useMemo, useEffect } from "react";
import { Box, Input, Button, Icon, useStore } from "zmp-framework/react";
import ProductList from "./product-list";
import store from "../store";
import "../css/inquiry.scss";

const Inquiry = () => {
  const categories = useStore("categories");
  const productList = useStore("products");

  const [selectedCategory, setSelectedCategory] = useState([]);

  useEffect(() => {
    store.dispatch("fetchProducts");
  }, []);

  function filterProducts() {
    if (!selectedCategory) {
      return productList;
    }
    return productList.filter((item) => item.category === selectedCategory);
  }
  console.log(productList);

  let filteredList = useMemo(filterProducts, [selectedCategory, productList]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <Box className="inquiry" px="2">
      <div className="flex-1 pr-4">
        <Input type="select">
          {filteredList.map((cate) => (
            <option
              key={cate.category}
              value={cate}
              onChange={handleCategoryChange}
            >
              {cate}
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
