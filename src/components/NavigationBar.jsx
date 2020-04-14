import React from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import {Container} from "react-bootstrap";

import "./NavigationBar.css"

export default function NavigationBar() {
  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto top-nav">
            <Nav.Item>
              <Link to="/" className={"nav-link"}>Home</Link>
            </Nav.Item>
            <Nav.Item>
              <Link to="/about" className={"nav-link"}>About</Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
