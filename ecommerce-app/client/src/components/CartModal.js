import React from "react";
import { Link } from "react-router-dom";

import { Box, Heading, Text, Image } from "gestalt";

import {
  FaShoppingCart,
  FaCartPlus,
  FaPlusSquare,
  FaMinusSquare
} from "react-icons/fa";

import { AppContext } from "./../context/AppContextProvider";
import API_URL from "./../api/strapi-config";

function CartModal(props) {
  const { state, dispatch } = React.useContext(AppContext);
  const updateCartItem = item => {
    const updateType = item.quantity > 0 ? 'UPDATE_CART_ITEM' : 'DELETE_CART_ITEM';
    dispatch({
      type: updateType,
      payload: item
    });
  };
  return (
    <Box display="flex" alignItems="center" direction="column" padding={2}>
      <Heading align="center" size="sm" color="midnight">
        Your Cart
      </Heading>
      <Box
        display="flex"
        justifyContent="between"
        column={12}
        paddingY={2}
        dangerouslySetInlineStyle={{
          __style: {
            borderBottom: "1px solid #133a5e"
          }
        }}
      >
        <Box display="flex">
          <FaShoppingCart color="#515783" size="1.2em" />
          <div
            style={{
              backgroundColor: "#6394F8",
              width: 20,
              height: 20,
              marginLeft: 4,
              borderRadius: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white"
            }}
          >
            {state.cart.length}
          </div>
        </Box>
        <Text color="gray">
          Total:{" "}
          <span style={{ color: "#6394F8" }}>
            $
            {state.cart
              .reduce((price, item) => price + item.quantity * item.price, 0)
              .toFixed(2)}
          </span>
        </Text>
      </Box>
      {state.cart.length > 0 ? (
        <React.Fragment>
          <Box
            display="flex"
            padding={5}
            alignItems="center"
            column={12}
            direction="column"
          >
            {state.cart.map(item => (
              <Box
                key={item.id}
                marginBottom={4}
                display="flex"
                column={12}
                alignItems="center"
              >
                <Box height={50} width={50}>
                  <Image
                    fit="cover"
                    src={`${API_URL}${item.image[0].url}`}
                    naturalWidth={1}
                    naturalHeight={1}
                    alt={`Brew ${item.name}`}
                  />
                </Box>
                <Box
                  display="flex"
                  direction="column"
                  marginLeft={4}
                  column={12}
                >
                  <Text bold size="lg">
                    {item.name}
                  </Text>
                  <Box
                    display="flex"
                    direction="row"
                    marginTop={1}
                    marginRight={10}
                    justifyContent="between"
                  >
                    <Text size="xs" color="blue">
                      ${item.price}
                    </Text>
                    <Box display="flex" direction="row">
                      <button
                        style={{ border: 0, padding: 0 }}
                        onClick={() => {
                          item.quantity--;
                          updateCartItem(item);
                        }}
                      >
                        <FaMinusSquare />
                      </button>
                      <Text size="xs" color="gray">
                        Quantity: {item.quantity}
                      </Text>
                      <button
                        style={{ border: 0, padding: 0 }}
                        onClick={() => {
                          item.quantity++;
                          updateCartItem(item);
                        }}
                      >
                        <FaPlusSquare />
                      </button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            ))}
          </Box>
          <Box marginTop={10} column={12} padding={5}>
            <div
              style={{
                background: "#6394F8",
                textAlign: "center",
                padding: "10px",
                borderRadius: 4,
                fontFamily: "inherit",
                fontWeight: "bold"
              }}
            >
              <Link to="/brews" style={{ color: "white", letterSpacing: 1 }}>
                Continue Shopping
              </Link>
            </div>
          </Box>
        </React.Fragment>
      ) : (
        <Box display="flex" direction="column" margin={10} alignItems="center">
          <FaCartPlus color="#FFD372" size="6em" />
          <Heading align="center" size="xs" color="darkGray">
            Your Cart is Empty
          </Heading>
          <div
            style={{ margin: "10px 30px", color: "gray", textAlign: "center" }}
          >
            Looks Like you haven't added anything to your cart
          </div>
          <Box marginTop={10} column={12}>
            <div
              style={{
                background: "#6394F8",
                textAlign: "center",
                padding: "10px",
                borderRadius: 4,
                fontFamily: "inherit",
                fontWeight: "bold"
              }}
            >
              <Link to="/brews" style={{ color: "white", letterSpacing: 1 }}>
                Continue Shopping
              </Link>
            </div>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default CartModal;
