import React from "react";

export default function HumanSummarySection(summary, fields) {
  if (summary.length) {
    return (
      <div>
        <div className="my-1 ml-1 mr-3 font-weight-bold">
          User-submitted summary:
        </div>
        <div
          className="my-1 ml-1 mr-3 msweb-is-darkcyan-txt"
          dangerouslySetInnerHTML={{
            __html: summary,
          }}
        />
      </div>
    );
  } else {
    let params = {
      link: encodeURIComponent(fields.link),
      doi: encodeURIComponent(fields.doi),
      abstract: encodeURIComponent(fields.abstract),
    };

    // If url with params is too long, delete the abstract
    if (params.abstract && params.abstract.length > 2048) {
      delete params.abstract;
    }
    let gform_url = "https://docs.google.com/forms/d/e/1FAIpQLSf4z7LCBizCs6pUgO3UyfxJMCAVC-bRh3cvW7uNghDu4UeBig/viewform?usp=pp_url";
    let true_url = (
      gform_url +
      '&entry.101149199=' + params.link +
      '&entry.1258141481=' + params.doi +
      '&entry.112702407=' + params.abstract);

    return (
      <div>
        <div className="my-1 ml-1 mr-3 human-summary-submission">
          <a target="_blank"
             rel="noopener noreferrer"
             href={true_url}
             className="float-right">
            Submit/fix metadata
          </a>
        </div>
      </div>
    );
  }
}