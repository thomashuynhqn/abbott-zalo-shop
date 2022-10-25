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
import Select from "react-select";
import phoneIcon from "../static/icons/phone.svg";
import useLocationForm from "../services/fetchLocation";
import LocationForm from "./location";
import store from "../store";

const AddressPicker = () => {
  // const [province, setProvince] = useState();
  // const [district, setDistrict] = useState();
  // const [ward, setWard] = useState();
  const [name, setName] = useState("");
  const [inputAddress, setInputAddress] = useState("");

  const user = useStore("user");
  const phoneNumber = useStore("phone");

  const { state, onCitySelect, onDistrictSelect, onWardSelect } =
    useLocationForm(false);

  const {
    cityOptions,
    districtOptions,
    wardOptions,
    selectedCity,
    selectedDistrict,
    selectedWard,
  } = state;

  const customStyles = {
    control: (base) => ({
      ...base,
      maxHeight: 120,
      minHeight: 35,
      zIndex: 0,
    }),
  };

  // const provinces = useStore("province");
  // const districts = useStore("district");

  // useEffect(() => {
  //   store.dispatch("fetchProvince");
  //   store.dispatch("fetchDistrict");
  // }, []);

  useEffect(() => {
    if (!name && !!user) {
      setName(user.name);
    }
  }, [user]);

  // const pickDistrict = districts.find((p) => p.value === province);

  // const pickWard = pickDistrict?.states?.find((s) => s.district === district);

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
                <div className="select-wrapper">
                  <Select
                    classNamePrefix={"my-custom-react-select"}
                    name="cityId"
                    key={`cityId_${selectedCity?.value}`}
                    isDisabled={cityOptions.length === 0}
                    options={cityOptions}
                    onChange={(option) => onCitySelect(option)}
                    placeholder="Tỉnh/Thành"
                    defaultValue={selectedCity}
                    styles={customStyles}
                    menuPlacement="auto"
                  />
                  <Select
                    classNamePrefix={"my-custom-react-select"}
                    name="districtId"
                    key={`districtId_${selectedDistrict?.value}`}
                    isDisabled={districtOptions.length === 0}
                    options={districtOptions}
                    onChange={(option) => onDistrictSelect(option)}
                    placeholder="Quận/Huyện"
                    defaultValue={selectedDistrict}
                    styles={customStyles}
                    menuPlacement="auto"
                  />

                  <Select
                    classNamePrefix={"my-custom-react-select"}
                    name="wardId"
                    key={`wardId_${selectedWard?.value}`}
                    isDisabled={wardOptions.length === 0}
                    options={wardOptions}
                    placeholder="Phường/Xã"
                    onChange={(option) => onWardSelect(option)}
                    defaultValue={selectedWard}
                    styles={customStyles}
                    menuPlacement="auto"
                  />
                </div>
                <Input
                  type="textarea"
                  placeholder="Nhập địa chỉ..."
                  resizable
                  value={inputAddress}
                  onChange={(e) => setInputAddress(e.target.value)}
                  required
                />
                {/* <LocationForm /> */}
                {/* <div>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    <option>-- Chọn Tỉnh --</option>
                    {provinces.map((value, key) => {
                      return (
                        <option value={value.name} key={key.name}>
                          {value.name}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  >
                    <option>-- Chọn Quận/Huyện --</option>
                    {pickDistrict?.data.map((e, key) => {
                      return (
                        <option value={e.name} key={key.name}>
                          {e.name}
                        </option>
                      );
                    })}
                  </select>
                </div> */}
                {/* <div>
                  <select
                    value={ward}
                    onChange={(e) => setWard(e.target.value)}
                  >
                    <option>-- Chọn Phường/Xã --</option>
                    {pickWard?.ward.map((e, key) => {
                      return (
                        <option value={e.district} key={key}>
                          {e}
                        </option>
                      );
                    })}
                  </select>
                </div> */}
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
