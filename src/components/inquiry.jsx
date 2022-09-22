import React, { useState, useMemo, useEffect } from "react";
import { Box, Input, Button, Icon, useStore } from "zmp-framework/react";
import ProductList from "./product-list";
import store from "../store";
import "../css/inquiry.scss";

const Inquiry = () => {
  const itemApi = useStore("products");
  const [q, setQ] = useState("");
  const [searchParam] = useState(["_id"]);
  const [filterParam, setFilterParam] = useState(["category"]);

  // const [productList, setProductList] = useState([]);

  useEffect(() => {
    store.dispatch("fetchProducts");
  }, []);

  function search(itemApi) {
    return itemApi.filter((item) => {
      /*
 // in here we check if our region is equal to our c state
 // if it's equal to then only return the items that match
 // if not return All the countries
 */
      if (item.category == filterParam) {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      } else if (filterParam == "category") {
        return searchParam.some((newItem) => {
          return (
            item[newItem].toString().toLowerCase().indexOf(q.toLowerCase()) > -1
          );
        });
      }
    });
  }

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
        <Input
          type="select"
          onChange={(e) => {
            setFilterParam(e.target.value);
          }}
        >
          {itemApi.map((item) => (
            <option key={item._id} value={item.category}>
              {item._id}
            </option>
          ))}
        </Input>
      </div>
      <div className="product-row">
        {search(itemApi).map((element) => (
          <ProductList key={element.category} />
        ))}
      </div>
    </Box>
  );
};

Inquiry.displayName = "zmp-inquiry";

export default Inquiry;
