import React from "react";
import { NavLink } from "react-router-dom";
import { Box, Text, Heading, Image } from "gestalt";
import {FaShoppingCart} from "react-icons/fa";

import TooltipModal from "./TooltipModal/TooltipModal";
import CartModal from "./CartModal";

export default function Navbar() {
  return (
    <Box
      height={70}
      paddingX={4}
      color="midnight"
      display="flex"
      alignItems="center"
      justifyContent="between"
    >
      <NavLink exact to="/" activeClassName="normal">
        <Box display="flex" alignItems="center">
          <Box height={50} width={50}>
            <Image
              src="./icons/logo.svg"
              alt="BrewHaha Logo"
              naturalHeight={1}
              naturalWidth={1}
            />
          </Box>
          <Heading size="xs" color="orange">
            BrewHaha
          </Heading>
        </Box>
      </NavLink>
      <Box display="flex" alignItems="center">
        <NavLink activeClassName="active" to="/signin" className="nav-link">
          <Text size="xl" color="white">
            Sign In
          </Text>
        </NavLink>
        <NavLink activeClassName="active" to="/signup" className="nav-link">
          <Text size="xl" color="white">
            Sign Up
          </Text>
        </NavLink>
        <TooltipModal tooltipClass="nav-link" modal={<CartModal />}>
          <FaShoppingCart color="white" size="1.2em" />
        </TooltipModal>
      </Box>
    </Box>
  );
}
