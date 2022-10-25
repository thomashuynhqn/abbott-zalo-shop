import React from "react";
import useLocationForm from "../services/fetchLocation";
import Select from "react-select";
import "../css/location.scss";
import { ListInput } from "zmp-framework/react";

const LocationForm = () => {
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

  return (
    <form className="location-wrapper">
      <Select
        className="select-options"
        name="cityId"
        key={`cityId_${selectedCity?.value}`}
        isDisabled={cityOptions.length === 0}
        options={cityOptions}
        onChange={(option) => onCitySelect(option)}
        placeholder="Tỉnh/Thành"
        defaultValue={selectedCity}
      />
      <Select
        className="select-options"
        name="districtId"
        key={`districtId_${selectedDistrict?.value}`}
        isDisabled={districtOptions.length === 0}
        options={districtOptions}
        onChange={(option) => onDistrictSelect(option)}
        placeholder="Quận/Huyện"
        defaultValue={selectedDistrict}
      />

      <Select
        className="select-options"
        name="wardId"
        key={`wardId_${selectedWard?.value}`}
        isDisabled={wardOptions.length === 0}
        options={wardOptions}
        placeholder="Phường/Xã"
        onChange={(option) => onWardSelect(option)}
        defaultValue={selectedWard}
      />
    </form>
  );
};

LocationForm.displayName = "zmp-location";

export default LocationForm;
