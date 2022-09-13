import React, { useEffect, useMemo, useState } from "react";
import Item from "./item";
import "../css/demo.css";

const SearchFilterProduct = () => {
  var defaultsItem = [
    { name: "Table Tennis", category: "Indoor" },
    { name: "Football", category: "Outdoor" },
    { name: "Swimming", category: "Aquatics" },
    { name: "Chess", category: "Indoor" },
    { name: "BaseBall", category: "Outdoor" },
  ];

  const [itemList, setItemList] = useState([]);
  const [selectCategory, setSelectCategory] = useState();

  useEffect(() => {
    setItemList(defaultsItem);
  }, []);

  function getFilterItem() {
    if (!selectCategory) {
      return itemList;
    }
    return itemList.filter((item) => item.category === selectCategory);
  }

  let filterList = useMemo(getFilterItem, [selectCategory, itemList]);

  function handleCategoryChange(event) {
    setSelectCategory(event.target.value);
  }

  return (
    <div className="app">
      <div className="filter-container">
        <div>Filter by Category:</div>
        <div>
          <select
            name="category-list"
            id="category-list"
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Indoor">Indoor</option>
            <option value="Aquatics">Aquatics</option>
          </select>
        </div>
      </div>
      <div className="sport-list">
        {filterList.map((props, index) => (
          <Item {...props} key={index} />
        ))}
      </div>
    </div>
  );
};

SearchFilterProduct.displayName = "zmp-search-list";

export default SearchFilterProduct;
