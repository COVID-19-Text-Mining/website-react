import React from "react";

function formatDate(date, hasYear, hasMonth, hasDay) {
  const year = date.slice(0, 4);
  const month = date.slice(5, 7);
  const day = date.slice(8, 10);
  let dateString = "";
  if (hasMonth !== "false") {
    dateString += month + "/";
    if (hasDay !== "false") {
      dateString += day + "/";
    }
  }
  dateString += hasYear !== "false" ? year : "";
  return dateString;
}

export default function AuthorsJournalDate(
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
  journal = journal || "";

  let journalString =
    journal.length < 30 ? journal : journal.slice(0, 30) + "...";

  maxLength -= journalString.length;
  let authorString = "";
  if (authors.length > maxLength) {
    let authorArray = authors.split(", ");
    while (maxLength > 0 && authorArray.length > 0) {
      let currentAuthor = authorArray.pop();
      if (currentAuthor.length <= maxLength) {
        authorString += currentAuthor + ", ";
        maxLength -= currentAuthor.length;
      }
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
    <div className="mr-5">
      <span
        className="msweb-is-green-txt"
        title={authors}
        dangerouslySetInnerHTML={{
          __html: authorString + conditionalDash,
        }}
      />
      <span
        className="msweb-is-green-txt font-weight-bold"
        title={journal}
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
