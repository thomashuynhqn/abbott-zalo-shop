import React from "react";
import discount1 from "../static/icons/discount-1.jpg";
import discount2 from "../static/icons/discount-2.png";
import discount3 from "../static/icons/discount-3.png";

const mockImages = {
  "discount-1": discount1,
  "discount-2": discount2,
};

const MockImage = ({ image, ...props }) => {
  return <img {...props} src={mockImages[image]} />;
};

MockImage.displayName = "zmp-mock-image";

export default MockImage;
