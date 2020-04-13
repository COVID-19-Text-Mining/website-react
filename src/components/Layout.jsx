import React from "react";
import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import "../assets/bulma.css";
import "../assets/bulma-helpers.css";
import "../assets/covidscholar.css";

export default function Layout(props) {
  return (
    <Container>
      {
        <div>
          <NavigationBar />
          {props.children}
          <div
            id="footer_container"
            className="content has-text-centered sui-layout-body margin"
          >
            <div>
              <a
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
                className="has-text-weight-bold"
              >
                About CovidScholar
              </a>
              <span> | </span>
              <a
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
                className="has-text-weight-bold"
              >
                Privacy Policy
              </a>
              <span> | </span>
              <a
                href="https://discuss.matsci.org/c/matscholar"
                target="_blank"
                rel="noopener noreferrer"
                className="has-text-weight-bold"
              >
                Matscholar Forum
              </a>
            </div>
            <div>
              <span></span>
              <span>Copyright © 2020 - Materials Intelligence</span>
            </div>
          </div>
        </div>
      }
    </Container>
  );
}
