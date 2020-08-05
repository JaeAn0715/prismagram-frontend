import React from "react";
import styled from "styled-components";

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: uppercase;
  font-weight: 600;
  font-size: 12px;
`;
const List = styled.ul`
  display: flex;
`;
const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;
const Link = styled.a`
  color: ${(props) => props.theme.darkerBlueColor};
`;
const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;

export default () => (
  <Footer>
    <List>
      <ListItem>
        <Link href="#">ABOUT</Link>
      </ListItem>
      <ListItem>
        <Link href="#">HELP</Link>
      </ListItem>
      <ListItem>
        <Link href="#">PRIVACY</Link>
      </ListItem>
      <ListItem>
        <Link href="#">TERMS</Link>
      </ListItem>
      <ListItem>
        <Link href="#">LOCATIONS</Link>
      </ListItem>
      <ListItem>
        <Link href="#">TOP</Link>
      </ListItem>
      <ListItem>
        <Link href="#">ACCOUNTS</Link>
      </ListItem>
      <ListItem>
        <Link href="#">HASH TAGS</Link>
      </ListItem>
      <ListItem>
        <Link href="#">LANGUAGE</Link>
      </ListItem>
    </List>
    <Copyright>© {new Date().getFullYear()} J-Stargram FROM Jae</Copyright>
  </Footer>
);
