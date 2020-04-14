import React from "react";


export function KeywordsSection(keywords) {
  if (keywords.length) {
    return (
      <div>
        <div className="my-1 ml-1 mr-3 font-weight-bold">
          {" "}
          User-submitted keywords:{" "}
        </div>
        <div
          className="my-1 ml-1 mr-3 font-weight-bold msweb-is-dimgray-txt"
          dangerouslySetInnerHTML={{
            __html: keywords,
          }}
        />
      </div>
    );
  }
  return null;
}

export function NLPKeywordsSection(keywordsML) {
  if (keywordsML.length) {
    return (
      <div>
        <div className="my-1 ml-1 mr-3 font-weight-bold">
          {" "}
          NLP-generated keywords:{" "}
        </div>
        <div
          className="my-1 ml-1 mr-3 font-weight-bold msweb-is-dimgray-txt"
          dangerouslySetInnerHTML={{
            __html: keywordsML,
          }}
        />
      </div>
    );
  }
  return null;
}

export default {KeywordsSection, NLPKeywordsSection}