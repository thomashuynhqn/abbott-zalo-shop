import React, { useEffect, useState } from "react";
import {
  Avatar,
  ActionsGroup,
  ActionsLabel,
  Icon,
  useStore,
  Box,
  List,
  ListItem,
  Input,
} from "zmp-framework/react";

import phoneIcon from "../static/icons/phone.svg";

const AddressPicker = ({ onBack }) => {
  const dataDummy = {
    countries: [
      {
        name: "Germany",
        states: [
          {
            name: "A",
            cities: ["Duesseldorf", "Leinfelden-Echterdingen", "Eschborn"],
          },
        ],
      },
      { name: "Spain", states: [{ name: "B", cities: ["Barcelona"] }] },

      { name: "USA", states: [{ name: "C", cities: ["Downers Grove"] }] },
      {
        name: "Mexico",
        states: [{ name: ["D", "F", "H"], cities: ["Puebla"] }],
      },
      {
        name: "India",
        states: [
          { name: "E", cities: ["Delhi", "Kolkata", "Mumbai", "Bangalore"] },
        ],
      },
    ],
  };

  const [selectedCountry, setSelectedCountry] = useState();
  const [selectedState, setSelectedState] = useState();
  const [selectedCity, setSelectedCity] = useState();

  const user = useStore("user");
  const phoneNumber = useStore("phone");

  const [name, setName] = useState("");
  const [address, setAddress] = useState("");

  const availableState = dataDummy.countries.find(
    (c) => c.name === selectedCountry
  );
  const availableCities = availableState?.states?.find(
    (s) => s.name === selectedState
  );

  useEffect(() => {
    if (!name && !!user) {
      setName(user.name);
    }
  }, [user]);

  return (
    <>
      <ActionsGroup>
        <ActionsLabel className="p-0">
          <List className="my-0">
            <ListItem className="editable-info">
              <Box slot="root-start" className="label">
                <Icon slot="media" zmp="zi-user-circle" size="24" />
                Tên người nhận
              </Box>
              <div className="inline-input">
                <Input
                  type="text"
                  placeholder="Nhập tên người nhận..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </ListItem>
            <ListItem className="editable-info">
              <Box slot="root-start" className="label">
                <Avatar slot="media" src={phoneIcon} size="24" />
                Số điện thoại
              </Box>

              <div className="inline-input">
                <Input
                  type="text"
                  placeholder="Nhập số điện thoại..."
                  value={phoneNumber}
                />
              </div>
            </ListItem>
            <ListItem className="editable-info">
              <Box slot="root-start" className="label">
                <Icon slot="media" zmp="zi-location-solid" size="24" />
                Địa chỉ
              </Box>
              <div className="inline-input">
                {" "}
                <div>
                  <select
                    placeholder="Country"
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                  >
                    <option>--Choose Country--</option>
                    {dataDummy.countries.map((value, key) => {
                      return (
                        <option value={value.name} key={key}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <select
                    placeholder="State"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)}
                  >
                    <option>--Choose State--</option>
                    {availableState?.states.map((e, key) => {
                      return (
                        <option value={e.name} key={key}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <select
                    placeholder="City"
                    value={selectedCity}
                    onChange={(e) => setSelectedCity(e.target.value)}
                  >
                    <option>--Choose City--</option>
                    {availableCities?.cities.map((e, key) => {
                      return (
                        <option value={e.name} key={key}>
                          {e}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </ListItem>
          </List>
        </ActionsLabel>
      </ActionsGroup>
    </>
  );
};

AddressPicker.displayName = "zmp-address-picker";

export default AddressPicker;
