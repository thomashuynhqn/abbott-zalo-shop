import React, { useState, useMemo } from "react";
import { Box, Input, Button, Icon, useStore } from "zmp-framework/react";
import ProductList from "./product-list";
import "../css/inquiry.scss";

const Inquiry = () => {
  const categories = useStore("categories");
  const itemList = useStore("products");

  const [selectedCategory, setSelectedCategory] = useState();

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
      <Button typeName="tertiary">
        <Icon zmp="zi-search" size="32" className="mr-0"></Icon>
      </Button>
      <div className="product-row">
        {filteredList.map((element, index) => (
          <ProductList {...element} key={index} />
        ))}
      </div>
    </Box>
  );
};

Inquiry.displayName = "zmp-inquiry";

export default Inquiry;
