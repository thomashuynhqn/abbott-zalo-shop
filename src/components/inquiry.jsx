import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Input,
  Button,
  Icon,
  Col,
  Title,
  Row,
  SkeletonBlock,
  useStore,
} from "zmp-framework/react";
import ProductList from "./product-list";
import store from "../store";
import Product from "./product";

import "../css/inquiry.scss";
import "../css/product.scss";

const Inquiry = () => {
  const [itemList, setItemList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const itemApi = useStore("products");
  useEffect(() => {
    store.dispatch("fetchProducts");
  }, []);

  useEffect(() => {
    setItemList(itemApi);
  }, []);

  function getFilteredList() {
    if (!selectedCategory) {
      return itemList;
    }
    return itemList.filter((product) => product._id === selectedCategory);
  }

  const filteredList = useMemo(getFilteredList, [selectedCategory, itemList]);

  function handleCategoryChange(event) {
    setSelectedCategory(event.target.value);
  }

  return (
    <Box className="inquiry" px="2">
      <div className="flex-1 pr-4">
        <Input type="select" onChange={handleCategoryChange}>
          <option value="">All</option>
          <option value="Ensure Gold">Ensure Gold</option>
          <option value="Glucerna">Glucerna</option>
        </Input>
      </div>
      {filteredList.map(({ _id: groupName, products }) => (
        <Box key={groupName} m={0}>
          <Title className="none-m m-auto p-text" bold>
            {groupName}
          </Title>
          <Box className="product-row">
            <Row
              style={{
                width: `calc(${products.length * 50}vw - ${
                  products.length * 20
                }px + ${(products.length - 1) * 8}px)`,
              }}
            >
              {products.map((product) => (
                <Col key={product._id} className="product-column">
                  <Product {...product} />
                </Col>
              ))}
            </Row>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

Inquiry.displayName = "zmp-inquiry";

export default Inquiry;
