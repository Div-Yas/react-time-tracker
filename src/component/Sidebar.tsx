import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";

const SidebarContainer = styled.div`
  width: 250px;
  height: 100vh;
  background-color: #000080;
  position: fixed;
  top: 20px;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const MenuItems = styled.li`
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: start;
  width: 100%;
  height: 50px;
  padding: 1rem 0 1.25rem;
`;

const MenuItemLinks = styled(Link)<{ active: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 2rem;
  font-size: 15px;
  text-decoration: none;
  color: ${({ active }) => (active ? "#000080" : "#ffffff")};
  background-color: ${({ active }) => (active ? "#ffffff" : "transparent")};
  width: 100%;
  height: 45px;
  text-align: center;
  border-radius: ${({ active }) => (active ? "5px" : "0")};

  &:hover,
  &:active {
    background-color: #ffffff;
    color: #000080;
    width: 100%;
    height: 45px;
    text-align: center;
    border-radius: 5px;
  }
`;

const Sidebar: React.FunctionComponent = () => {
  const location = useLocation();

  return (
    <SidebarContainer>
      {SidebarData.map((item, index) => (
        <MenuItems key={index + 1}>
          <MenuItemLinks
            to={item.path}
            active={location.pathname === item.path}
          >
            {item.icon}
            <span style={{ marginLeft: "16px" }}>{item.title}</span>
          </MenuItemLinks>
        </MenuItems>
      ))}
    </SidebarContainer>
  );
};

export default Sidebar;
