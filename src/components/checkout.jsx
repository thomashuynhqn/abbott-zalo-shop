import React, { useEffect, useState } from "react";
import {
  Button,
  Text,
  Sheet,
  Box,
  List,
  ListItem,
  Icon,
  Avatar,
  Input,
  useStore,
  Link,
  Checkbox,
  zmp,
  Preloader,
} from "zmp-framework/react";
import shop from "../static/icons/shop.svg";
import deliveryIcon from "../static/icons/delivery.svg";
import clockIcon from "../static/icons/clock.svg";
import noteIcon from "../static/icons/note.svg";
import { Price } from "./prices";
import ProductOrder from "./product-order";
import DeliveryMethodPicker from "./delivery-method-picker";
import store from "../store";
import ShippingTimePicker from "./shipping-time-picker";
import "../css/checkout.scss";
import AddressPicker from "./address-picker";

const Checkout = ({ children, onReturn }) => {
  const showCheckout = useStore("showCheckout");
  const setShowCheckout = (value) => {
    store.dispatch("setShowCheckout", value);
  };
  const selectedShop = useStore("selectedShop");
  const selectedAddress = useStore("selectedAddress");
  const cart = useStore("cart");
  const totalAmount = useStore("totalAmount");

  const [show, setShow] = useState(false);
  useEffect(() => setShow(showCheckout), [showCheckout]);

  const selectedDiscount = useStore("selectedDiscount");
  const showDiscounts = () => {
    zmp.views.main.router.navigate("/discount");
    setShowCheckout(false);
  };

  const [loading, setLoading] = useState(false);
  const checkout = async () => {
    setLoading(true);
    await store.dispatch("checkout");
    setLoading(false);
  };

  const note = useStore("note");

  const [agree, setAgree] = useState(true);

  return (
    <>
      <div onClick={() => setShowCheckout(true)}>{children}</div>
      <Sheet
        className="has-fixed-action"
        opened={show}
        onSheetClosed={() => setShowCheckout(false)}
        onSheetClose={() => {
          if (onReturn) {
            onReturn();
          }
        }}
        title="Xác nhận đơn hàng"
        closeButton
        backdrop
      >
        <Text className="section-label" bold>
          Địa chỉ nhận hàng
        </Text>
        <AddressPicker />
        <Text className="section-label" bold>
          Thông tin thêm
        </Text>
        <List className="my-0">
          <ListItem className="editable-info">
            <Box slot="root-start" className="label">
              Ghi chú
            </Box>
            <img slot="media" src={noteIcon} size="24" />
            <div className="inline-input">
              <Input
                type="textarea"
                maxlength={500}
                placeholder="Nhập nội dung ghi chú... (tối đa 500 ký tự)"
                resizable
                value={note}
                onChange={(e) => store.dispatch("setNote", e.target.value)}
              />
            </div>
          </ListItem>
        </List>
        <Text className="section-label" bold>
          Thông tin đơn hàng
        </Text>
        <List className="my-0">
          {cart.map((item, i) => (
            <ListItem key={i}>
              <img
                slot="media"
                src={item.product.image}
                className="product-image"
              />
              <Price
                slot="content"
                amount={item.subtotal}
                unit="đ"
                className="pr-4"
              />
              <Box className="text-left">
                <Text className="mb-0" bold>
                  <span className="text-danger">{item.quantity}x</span>{" "}
                  {item.product.name}
                </Text>
                <div className="d-flex">
                  {item.size && (
                    <Text className="mb-0 text-secondary">
                      Size {item.size.name}
                      {item.topping && ", "}
                    </Text>
                  )}
                  {item.topping && (
                    <Text className="mb-0 text-secondary">
                      {item.topping.name}
                    </Text>
                  )}
                </div>
                {item.note && (
                  <Text className="mb-0 text-secondary">
                    Ghi chú: {item.note}
                  </Text>
                )}
                <ProductOrder
                  product={item.product}
                  cartItem={item}
                  cartIndex={i}
                >
                  <Link className="text-primary">Chỉnh sửa</Link>
                </ProductOrder>
              </Box>
            </ListItem>
          ))}
          <ListItem>
            <Text slot="media" className="text-secondary">
              Tạm tính
            </Text>
            <Price
              slot="content"
              amount={totalAmount}
              unit="đ"
              className="pr-4"
            />
          </ListItem>
        </List>
        <Box className="sticky-action-footer">
          <List className="my-0">
            <ListItem>
              <Text slot="before-title" className="text-secondary mb-0">
                Mã ưu đãi
              </Text>
              <Icon slot="content" zmp="zi-chevron-right" />
              <Link onClick={showDiscounts} slot="after">
                {selectedDiscount ? (
                  <Text slot="after" bold className="mb-0">
                    {selectedDiscount}
                  </Text>
                ) : (
                  <Text className="text-secondary mb-0">Chọn mã ưu đãi</Text>
                )}
              </Link>
            </ListItem>
            <ListItem>
              <div className="flex-1">
                <Box className="d-flex v-center space-between">
                  <Text>Tổng tiền</Text>
                  <Price fontSize={20} bold amount={totalAmount} />
                </Box>
                <Box>
                  <Button
                    onClick={checkout}
                    large
                    responsive
                    fill
                    disabled={loading || !agree}
                  >
                    {loading && <Preloader className="loading-button" />}
                    Thanh toán
                  </Button>
                </Box>
              </div>
            </ListItem>
          </List>
        </Box>
      </Sheet>
    </>
  );
};

Checkout.displayName = "zmp-checkout";

export default Checkout;
