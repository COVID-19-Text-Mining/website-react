import PropTypes from "prop-types";
import React from "react";

import {appendClassName} from "@elastic/react-search-ui-views/lib/view-helpers";
import {isFieldValueWrapper} from "@elastic/react-search-ui-views/lib/types/FieldValueWrapper";

import ReadMore from "./ReadMore"
import AuthorsJournalDate from "./ResultComponents/AuthorsJournslDate";
import {KeywordsSection, NLPKeywordsSection} from "./ResultComponents/Keywords";
import HumanSummarySection from "./ResultComponents/HumanSummary";
import TitleSection from "./ResultComponents/Title"

import "./ResultView.css";

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
  // const abstractRaw = getRaw(result, "abstract") || "";
  const journal = getRaw(result, "journal") || "";
  let keywords = getEscapedField(result, "keywords");
  if (keywords.startsWith(",")) {
    keywords = keywords.slice(1, -1);
  }
  let keywordsML = getEscapedField(result, "keywords_ml");
  if (keywordsML.startsWith(",")) {
    keywordsML = keywordsML.slice(1, -1);
  }
  const maxLength = 90;
  const summaryHuman = getEscapedField(result, "summary_human");

  return (
    <li
      className={appendClassName(
        "sui-result my-3 pt-3 pb-1",
        className
      )}
      {...rest}
    >
      <div className="sui-result__header ml-4 p-0 mb-1">
        {TitleSection(titleOrBestAlternative, url, onClickLink)}
      </div>
      <div className="ml-4">
        <ul>
          <li>
            {AuthorsJournalDate(
              authors,
              journal,
              publicationDate,
              hasYear,
              hasMonth,
              hasDay,
              maxLength
            )}
          </li>
          <li>
            <ReadMore long={result.abstract.raw || ""} short={abstract.slice(0, 345)}/>
          </li>
          <li>{KeywordsSection(keywords)}</li>
          <li>{NLPKeywordsSection(keywordsML)}</li>
          <li>{HumanSummarySection(summaryHuman, fields)}</li>
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
