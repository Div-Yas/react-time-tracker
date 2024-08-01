import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  background-color: #000080;
  color: #ffffff;
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
`;

const FooterText = styled.p`
  margin: 0;
`;

const Footer: React.FunctionComponent = () => {
  return (
    <FooterContainer>
      <FooterText>© 2024 Time Tracking Tool. All rights reserved.</FooterText>
    </FooterContainer>
  );
};

export default Footer;
