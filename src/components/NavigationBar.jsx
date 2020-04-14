import React from "react";
import {Link} from "react-router-dom";
import {Nav, Navbar} from "react-bootstrap";
import styled from "styled-components";
import {Container} from "react-bootstrap";

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
                <Container>
                    <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
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
        </Styles>
    );
}
