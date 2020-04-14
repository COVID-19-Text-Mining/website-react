import React from "react";
import {Container, Row} from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import Footer from "./Footer";
// import "../assets/bulma.css";
// import "../assets/bulma-helpers.css";
import "../assets/covidscholar.css";

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
