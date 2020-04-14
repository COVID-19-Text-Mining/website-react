import React from "react";

// import "../assets/bulma.css";
// import "../assets/bulma-helpers.css";
import "../assets/covidscholar.css";

import { ErrorBoundary } from "@elastic/react-search-ui";

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

      <h1> Privacy Policy</h1>
      <p>
        At CovidScholar, accessible from covidscholar.org, one of our main
        priorities is the privacy of our visitors. This Privacy Policy document
        contains types of information that is collected and recorded by Covid
        Scholar and how we use it.
      </p>

      <p>
        If you have additional questions or require more information about our
        Privacy Policy, do not hesitate to contact us.
      </p>

      <p>
        This Privacy Policy applies only to our online activities and is valid
        for visitors to our website with regards to the information that they
        shared and/or collect in CovidScholar. This policy is not applicable to
        any information collected offline or via channels other than this
        website.
      </p>

      <h2>Consent</h2>

      <p>
        By using our website, you hereby consent to our Privacy Policy and agree
        to its terms.
      </p>

      <h3>Information we collect</h3>

      <p>
        The personal information that you are asked to provide, and the reasons
        why you are asked to provide it, will be made clear to you at the point
        we ask you to provide your personal information.
      </p>
      <p>
        If you contact us directly, we may receive additional information about
        you such as your name, email address, phone number, the contents of the
        message and/or attachments you may send us, and any other information
        you may choose to provide.
      </p>

      <h3>How we use your information</h3>

      <p>We use the information we collect in various ways, including to:</p>

      <ul>
        <li>Provide, operate, and maintain our webste</li>
        <li>Improve, personalize, and expand our webste</li>
        <li>Understand and analyze how you use our webste</li>
        <li>Develop new products, services, features, and functionality</li>
      </ul>

      <h3>Log Files</h3>

      <p>
        CovidScholar follows a standard procedure of using log files. These
        files log visitors when they visit websites. All hosting companies do
        this and a part of hosting services' analytics. The information
        collected by log files include internet protocol (IP) addresses, browser
        type, Internet Service Provider (ISP), date and time stamp,
        referring/exit pages, and possibly the number of clicks. These are not
        linked to any information that is personally identifiable. The purpose
        of the information is for analyzing trends, administering the site,
        tracking users' movement on the website, and gathering demographic
        information.
      </p>

      <h3>CCPA Privacy Rights (Do Not Sell My Personal Information)</h3>

      <p>
        Under the CCPA, among other rights, California consumers have the right
        to:
      </p>
      <p>
        Request that a business that collects a consumer's personal data
        disclose the categories and specific pieces of personal data that a
        business has collected about consumers.
      </p>
      <p>
        Request that a business delete any personal data about the consumer that
        a business has collected.
      </p>
      <p>
        Request that a business that sells a consumer's personal data, not sell
        the consumer's personal data.
      </p>
      <p>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us.
      </p>

      <h2>GDPR Data Protection Rights</h2>

      <p>
        We would like to make sure you are fully aware of all of your data
        protection rights. Every user is entitled to the following:
      </p>
      <p>
        The right to access – You have the right to request copies of your
        personal data. We may charge you a small fee for this service.
      </p>
      <p>
        The right to rectification – You have the right to request that we
        correct any information you believe is inaccurate. You also have the
        right to request that we complete the information you believe is
        incomplete.
      </p>
      <p>
        The right to erasure – You have the right to request that we erase your
        personal data, under certain conditions.
      </p>
      <p>
        The right to restrict processing – You have the right to request that we
        restrict the processing of your personal data, under certain conditions.
      </p>
      <p>
        The right to object to processing – You have the right to object to our
        processing of your personal data, under certain conditions.
      </p>
      <p>
        The right to data portability – You have the right to request that we
        transfer the data that we have collected to another organization, or
        directly to you, under certain conditions.
      </p>
      <p>
        If you make a request, we have one month to respond to you. If you would
        like to exercise any of these rights, please contact us.
      </p>

      <h2>Children's Information</h2>

      <p>
        Another part of our priority is adding protection for children while
        using the internet. We encourage parents and guardians to observe,
        participate in, and/or monitor and guide their online activity.
      </p>

      <p>
        CovidScholar does not knowingly collect any Personal Identifiable
        Information from children under the age of 13. If you think that your
        child provided this kind of information on our website, we strongly
        encourage you to contact us immediately and we will do our best efforts
        to promptly remove such information from our records.
      </p>

      <h3>Contact</h3>
      <p>
        Contact If you have any questions, comments, complaints or requests
        regarding this privacy policy or our processing of your information,
        please contact us via email at jdagdelen@lbl.gov. You also may lodge a
        complaint with the data protection authority in the applicable
        jurisdiction.
      </p>
    </div>
  );
}
