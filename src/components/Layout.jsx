import React from "react";
import {Container} from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";

export default function Layout(props) {
  return (
    <div>
      <NavigationBar/>
      <Container>
        <div>
          {props.children}
        </div>
      </Container>

      <Container>
        <Footer/>
      </Container>
    </div>
  );
}
