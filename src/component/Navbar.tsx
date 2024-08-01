import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars, FaBell, FaEnvelope, FaUserCircle } from "react-icons/fa";

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3.5rem;
  background-color: #000080;
  padding: 0 1rem;
  color: #ffffff;
`;

const NavLogo = styled(Link)`
  color: #ffffff;
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
`;

const NavSearch = styled.input`
  margin: 0 1rem;
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  width: 300px;
`;

const NavIcons = styled.div`
  display: flex;
  align-items: center;
`;

const NavIcon = styled(Link)`
  color: #ffffff;
  font-size: 1.5rem;
  margin-left: 1rem;
  text-decoration: none;
`;

const Navbar: React.FunctionComponent = () => {
  return (
    <NavbarContainer>
      <NavLogo to="/">
        <FaBars />{" "}
        <span style={{ marginLeft: "12px" }}>Time Tracking Tool</span>
      </NavLogo>
      <NavSearch type="text" placeholder="Search..." />
      <NavIcons>
        <NavIcon to="/">
          <FaEnvelope />
        </NavIcon>
        <NavIcon to="/">
          <FaBell />
        </NavIcon>
        <NavIcon to="/">
          <FaUserCircle />
        </NavIcon>
      </NavIcons>
    </NavbarContainer>
  );
};

export default Navbar;
