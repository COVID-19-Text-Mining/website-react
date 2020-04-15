import React from "react";

export default function About() {
  return (
      <div>
        <h1>About CovidScholar</h1>
        <div className="columns is-centered">
          <div className="column is-full is-size-6 ">
            <p>
              This website uses natural language processing (NLP) to power search
              on a set of research papers related to COVID-19. It was created by
              the team behind <a href="https://www.matscholar.com">Matscholar</a>,
              a research effort led by the{" "}
              <a href="https://hackingmaterials.lbl.gov">HackingMaterials</a>,{" "}
              <a href="https://perssongroup.lbl.gov">Persson</a>, and{" "}
              <a href="https://ceder.berkeley.edu">Ceder</a> research groups at
              Lawrence Berkeley National Lab. The virus icon in our logo was made
              by Freepik from www.flaticon.com
            </p>
          </div>
        </div>
      </div>
  );
}
