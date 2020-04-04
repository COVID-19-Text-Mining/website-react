import PropTypes from "prop-types";
import React from "react";

import {appendClassName} from "@elastic/react-search-ui-views/lib/view-helpers";
import {isFieldValueWrapper} from "@elastic/react-search-ui-views/lib/types/FieldValueWrapper";

function getFieldType(result, field, type) {
  if (result[field]) return result[field][type];
}

function getRaw(result, field) {
  return getFieldType(result, field, "raw");
}

function getSnippet(result, field) {
  return getFieldType(result, field, "snippet");
}

function htmlEscape(str) {
  if (!str) return "";

  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function getEscapedField(result, field) {
  // Fallback to raw values here, because non-string fields
  // will not have a snippet fallback. Raw values MUST be html escaped.
  const safeField =
    getSnippet(result, field) || htmlEscape(getRaw(result, field));
  return Array.isArray(safeField) ? safeField.join(", ") : safeField;
}

function getEscapedFields(result) {
  return Object.keys(result).reduce((acc, field) => {
    // If we receive an arbitrary value from the response, we may not properly
    // handle it, so we should filter out arbitrary values here.
    //
    // I.e.,
    // Arbitrary value: "_metaField: '1939191'"
    // vs.
    // FieldValueWrapper: "_metaField: {raw: '1939191'}"
    if (!isFieldValueWrapper(result[field])) return acc;
    return {...acc, [field]: getEscapedField(result, field)};
  }, {});
}

function formatDate(date, hasYear, hasMonth, hasDay) {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  var dateString = "";
  if (hasMonth !== "false") {
    dateString += month + "/";
    if (hasDay !== "false") {
      dateString += day + "/";
    }
  }
  dateString += hasYear !== "false" ? year : "";
  return dateString;
}

function formatAuthorsJournalDate(
  authors,
  journal,
  date,
  hasYear,
  hasMonth,
  hasDay,
  maxLength
) {
  const dateString = formatDate(date, hasYear, hasMonth, hasDay);

  maxLength -= dateString.length;
  let journalString = journal || "";

  journalString =
    journalString.length < 30
      ? journalString
      : journalString.slice(0, 30) + "...";

  maxLength -= journalString.length;
  var authorString = "";
  if (authors.length > maxLength) {
    var authorArray = authors.split(", ");
    while (maxLength > 0 && authorArray.length > 0) {
      let currentAuthor = authorArray.pop();
      authorString += currentAuthor + ", ";
      maxLength -= currentAuthor.length;
    }
    authorString =
      authorArray.length === 0
        ? authorString.slice(0, -2)
        : authorString.slice(0, -2) + ",...";
  } else {
    authorString = authors;
  }
  const conditionalDash = journalString.length > 0 ? " - " : "";
  const conditionalComma = dateString.length > 0 ? " - " : "";
  return (
    <div className="">
      <span
        className="msweb-is-green-txt"
        dangerouslySetInnerHTML={{
          __html: authorString + conditionalDash,
        }}
      />
      <span
        className="msweb-is-green-txt is-bold"
        dangerouslySetInnerHTML={{
          __html: journalString,
        }}
      />
      <span
        className="msweb-is-green-txt"
        dangerouslySetInnerHTML={{
          __html: conditionalComma + dateString,
        }}
      />
    </div>
  );
}

function makeKeywordsSection(keywords) {
  if (keywords.length) {
    return (
      <div>
        <div className="has-margin-5 has-text-weight-bold">
          {" "}
          User-submitted keywords:{" "}
        </div>
        <div
          className="is-multiline has-margin-5 has-text-weight-bold msweb-is-dimgray-txt"
          dangerouslySetInnerHTML={{
            __html: keywords,
          }}
        />
      </div>
    );
  }
  return null;
}

function makeNLPKeywordsSection(keywordsML) {
  if (keywordsML.length) {
    return (
      <div>
        <div className="has-margin-5 has-text-weight-bold">
          {" "}
          NLP-generated keywords:{" "}
        </div>
        <div
          className="is-multiline has-margin-5 has-text-weight-bold msweb-is-dimgray-txt"
          dangerouslySetInnerHTML={{
            __html: keywordsML,
          }}
        />
      </div>
    );
  }
  return null;
}

function makeHumanSummarySection(summary, fields) {
  if (summary.length) {
    return (
      <div>
        <div className="has-margin-5 has-text-weight-bold">
          User-submitted summary:
        </div>
        <div
          className="is-multiline has-margin-5 msweb-is-purple-txt"
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
        <div className="has-margin-5 has-text-weight-bold human-summary-submission">
          <a target="_blank" rel="noopener noreferrer" href={true_url}>
            Submit a summary for this article (or help fix a bad abstract).
          </a>
        </div>
      </div>
    );
  }
}

function ResultView({
  className,
  result,
  onClickLink,
  titleField,
  urlField,
  ...rest
}) {
  const fields = getEscapedFields(result);
  const title = getEscapedField(result, titleField);
  const url = getRaw(result, urlField);
  const publicationDate = getRaw(result, "publication_date");
  const hasYear = getRaw(result, "has_year");
  const hasMonth = getRaw(result, "has_month");
  const hasDay = getRaw(result, "has_day");
  const doi = getRaw(result, "doi") || "";
  const titleOrBestAlternative = title ? title : doi ? doi : url;
  const authors = getEscapedField(result, "authors");
  const abstract = getEscapedField(result, "abstract") || "";
  const abstractRaw = getRaw(result, "abstract") || "";
  const journal = getRaw(result, "journal") || "";
  const keywords = getEscapedField(result, "keywords");
  const keywordsML = getEscapedField(result, "keywords_ml");
  const maxLength = 90;
  const summaryHuman = getEscapedField(result, "summary_human");

  return (
    <li
      className={appendClassName(
        "sui-result has-margin-bottom-10 has-margin-top-10",
        className
      )}
      {...rest}
    >
      <div className="sui-result__header has-margin-bottom-5">
        {titleOrBestAlternative && !url && (
          <span
            className="has-text-weight-bold has-margin-left-5 is-size-5"
            dangerouslySetInnerHTML={{__html: titleOrBestAlternative}}
          />
        )}
        {titleOrBestAlternative && url && (
          <a
            // className="sui-result__title sui-result__title-link has-margin-left-30"
            className="has-text-link has-text-weight-bold has-margin-left-5 is-size-5"
            dangerouslySetInnerHTML={{__html: titleOrBestAlternative}}
            href={url}
            onClick={onClickLink}
            target="_blank"
            rel="noopener noreferrer"
          />
        )}
      </div>
      <div className="has-margin-left-30">
        <ul>
          <li>
            <div className="has-margin-right-30">
              {formatAuthorsJournalDate(
                authors,
                journal,
                publicationDate,
                hasYear,
                hasMonth,
                hasDay,
                maxLength
              )}
            </div>
          </li>
          <li>
            <div>
              <div
                className="text-body is-size-6 has-margin-5 has-margin-right-30"
                dangerouslySetInnerHTML={{
                  __html:
                    abstract.length >= abstractRaw.length
                      ? abstract
                      : abstract + "...",
                }}
              />
            </div>
          </li>
          <li>{makeHumanSummarySection(summaryHuman, fields)}</li>
          <li>{makeKeywordsSection(keywords)}</li>
          <li>{makeNLPKeywordsSection(keywordsML)}</li>
        </ul>
      </div>
    </li>
  );
}

ResultView.propTypes = {
  result: PropTypes.object.isRequired,
  onClickLink: PropTypes.func.isRequired,
  className: PropTypes.string,
  titleField: PropTypes.string,
  urlField: PropTypes.string,
};

export default ResultView;
