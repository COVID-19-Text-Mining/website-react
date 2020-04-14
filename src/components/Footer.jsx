import React from "react";
import {Row} from "react-bootstrap";
import {Link} from "react-router-dom";

export default function Footer() {
    return (
        <Row>
            <div
                id="footer_container"
                className="col-lg-12 text-center pb-lg-5">
                <div>
                    <Link to="/about" className={"font-weight-bold"}>About CovidScholar</Link>
                    <span> | </span>
                    <Link to="/about" className={"font-weight-bold"}>Privacy Policy</Link>
                    <span> | </span>
                    <a
                        href="https://discuss.matsci.org/c/matscholar"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-weight-bold"
                    >
                        Matscholar Forum
                    </a>
                </div>
                <div>
                    <span>Copyright © 2020 - Materials Intelligence</span>
                </div>
            </div>
        </Row>
    );
}
