import React from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar, Image } from "react-bootstrap";
import styled from "styled-components";

import "../assets/bulma.css";
import "../assets/bulma-helpers.css";
import "../assets/covidscholar.css";

const Styles = styled.div`
  .navbar {
    background-color: #ffff;
  }
  a,
  .navbar-brand,
  .navbar-nav .nav-link {
    text-decoration: none;
    color: #bbb;
    
    &:hover {
      color: #505050;
    }
  }
  .active {
    color: #505050;
  }
`;

export default function NavigationBar() {
  return (
    <Styles>
      <Navbar expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Item>
              {/*<Nav.Link href="/">Home*/}
                <Link to="/" class={"nav-link"}>Home</Link>
              {/*</Nav.Link>*/}
            </Nav.Item>
            <Nav.Item>
              {/*<Nav.Link href="/about">About*/}
                <Link to="/about" class={"nav-link"}>About</Link>
              {/*</Nav.Link>*/}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Styles>
  );
}
