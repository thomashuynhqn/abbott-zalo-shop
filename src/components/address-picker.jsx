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
import store from "../store";
import phoneIcon from "../static/icons/phone.svg";

const AddressPicker = () => {
  const [province, setProvince] = useState();
  const [district, setDistrict] = useState();
  const [ward, setWard] = useState();
  const [name, setName] = useState("");

  const user = useStore("user");
  const phoneNumber = useStore("phone");
  const address = useStore("addresses");

  const pickDistrict = address.find((p) => p.province === province);

  const pickWard = pickDistrict?.states?.find((s) => s.district === district);

  useEffect(() => {
    if (!name && !!user) {
      setName(user.name);
    }
  }, [user]);

  useEffect(() => {
    store.dispatch("fetchAddresses");
  }, []);

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
                <div>
                  <select
                    value={province}
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    <option>-- Chọn Tỉnh --</option>
                    {address.map((value, key) => {
                      return (
                        <option value={value.province} key={key}>
                          {value.province}
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
                    {pickDistrict?.states.map((e, key) => {
                      return (
                        <option value={e.district} key={key}>
                          {e.district}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
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
