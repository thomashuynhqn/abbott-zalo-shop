import React, { useState, useMemo, useEffect } from "react";
import {
  Text,
  Title,
  Sheet,
  Button,
  Icon,
  Input,
  Row,
  Col,
  Box,
  List,
  ListItem,
  zmp,
} from "zmp-framework/react";
import { Price, ExtraPrice } from "./prices";
import store from "../store";
import "../css/product-order.scss";

const ProductOrder = ({ product, children, cartItem, cartIndex }) => {
  const { name, price, image, flavor, description } = product;
  const [showOrder, setShowOrder] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [flavors, setFlavors] = useState(flavor[0]);
  const [note, setNote] = useState("");

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
      setFlavors(cartItem.flavors);
      setNote(cartItem.note);
    }
  }, [showOrder]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  const decreaseQuantity = () => {
    const limit = cartItem ? 0 : 1;
    setQuantity(quantity > limit ? quantity - 1 : limit);
  };

  const subtotal = useMemo(() => {
    let subtotal = price;
    if (flavors) {
      subtotal += flavors.extra;
    }
    subtotal *= quantity;
    return subtotal;
  }, [quantity, flavors]);

  const order = () => {
    const item = {
      quantity,
      flavors,
      subtotal,
      note,
      product,
    };
    if (cartItem) {
      store.dispatch("updateCartItem", { index: cartIndex, item });
    } else {
      store.dispatch("addToCart", item);
    }
  };
  const addToCart = () => {
    order();
    setShowOrder(false);
  };

  const removeFromCart = () => {
    zmp.dialog
      .create({
        title: "Xác nhận",
        content: "Bạn có chắc muốn xoá sản phẩm này khỏi đơn hàng?",
        buttons: [
          {
            text: "Không",
            close: true,
          },
          {
            text: "Đồng Ý",
            close: true,
            onClick() {
              setShowOrder(false);
              store.dispatch("removeCartItem", cartIndex);
            },
          },
        ],
      })
      .open();
  };

  const checkout = () => {
    order();
    setShowOrder(false);
    store.dispatch("setShowCheckout", true);
  };

  return (
    <div>
      <div onClick={() => setShowOrder(true)}>{children}</div>
      <Sheet
        className="has-fixed-action product-order"
        opened={showOrder}
        onSheetClosed={() => setShowOrder(false)}
        backdrop
        closeButton
        title="Chọn Sữa"
      >
        <Box className="bg-white product-preview">
          <Row>
            <Col className="image">
              <img src={image} className="w-100" />
            </Col>
            <Col className="description">
              <Title bold>{name}</Title>
              <Price amount={price} />
            </Col>
          </Row>
          <Row className="description-text">
            <Text>{description}</Text>
          </Row>
        </Box>
        <Box m={0} p={0} textAlign="left">
          <Box className="section-label">
            <Text bold>Chọn hương vị</Text>
          </Box>
          <List className="my-0">
            {flavor.map((s) => (
              <ListItem
                key={s.name}
                radio
                value={s.name}
                name="flavor"
                title={s.name}
                checked={flavors === s}
                onClick={() => setFlavors(s)}
              >
                {s.extra && <ExtraPrice amount={s.extra} />}
              </ListItem>
            ))}
          </List>
        </Box>
        <Box m={0} textAlign="left">
          <Box className="section-label">
            <Text bold>Số lượng</Text>
          </Box>
          <List className="my-0">
            <ListItem>
              <div className="quantity-selector">
                <Button small typeName="tertiary" onClick={decreaseQuantity}>
                  -
                </Button>
                <Box mx={6} mt={1}>
                  {quantity}
                </Box>
                <Button small typeName="tertiary" onClick={increaseQuantity}>
                  +
                </Button>
              </div>
            </ListItem>
          </List>
        </Box>
        <Box p={3} className="sticky-action-footer">
          <Row>
            <Col>
              <Box>Tổng tiền</Box>
            </Col>
            <Col className="text-right">
              <Box>
                <Price
                  className="text-primary"
                  bold
                  fontSize={20}
                  amount={subtotal}
                />
              </Box>
            </Col>
          </Row>
          <Row gap="gap_4" className="actions">
            {cartItem ? (
              <Col>
                {quantity > 0 ? (
                  <Button responsive typeName="primary" onClick={checkout}>
                    Cập nhật giỏ hàng
                  </Button>
                ) : (
                  <Button
                    responsive
                    typeName="destructive"
                    onClick={removeFromCart}
                  >
                    Xoá khỏi giỏ hàng
                  </Button>
                )}
              </Col>
            ) : (
              <>
                <Col>
                  <Button responsive typeName="secondary" onClick={checkout}>
                    Mua ngay
                  </Button>
                </Col>
                <Col>
                  <Button responsive typeName="primary" onClick={addToCart}>
                    Thêm vào giỏ
                  </Button>
                </Col>
              </>
            )}
          </Row>
        </Box>
      </Sheet>
    </div>
  );
};

ProductOrder.displayName = "zmp-product-order";

export default ProductOrder;
