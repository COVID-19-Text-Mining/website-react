import React from "react";

export default function TitleSection(titleOrBestAlternative, url, onClickLink) {
  return (
    <div>
      {titleOrBestAlternative && !url && (
        <span
          className="result-title font-weight-bold larger"
          dangerouslySetInnerHTML={{__html: titleOrBestAlternative}}
        />
      )}
      {titleOrBestAlternative && url && (
        <a
          // className="sui-result__title sui-result__title-link has-margin-left-30"
          className="result-title font-weight-bold larger"
          dangerouslySetInnerHTML={{__html: titleOrBestAlternative}}
          href={url}
          onClick={onClickLink}
          target="_blank"
          rel="noopener noreferrer"
        />
      )}
    </div>
  )
}