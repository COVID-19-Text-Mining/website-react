import React from "react";
import { Facet, Sorting } from "@elastic/react-search-ui";
import {
  buildSortOptionsFromConfig,
  getFacetFields,
} from "../config/config-helper";
import { MultiCheckboxFacet} from "@elastic/react-search-ui-views";

import BetterMultiCheckboxFacet from "./BetterMultiCheckboxFacet"
import "./FieldSideBar.css";

function formatLabel(field) {
  if (field === "is_covid19_ml_bool") {
    return "Only COVID-19 Papers";
  } else {
    return field;
  }
}

export default function FilterSideBar(wasSearched) {
  return (
    <div>
      {wasSearched && (
        <Sorting label={"Sort by"} sortOptions={buildSortOptionsFromConfig()} />
      )}
      {getFacetFields()
        .filter(function (field) {
          return field !== "Rebels";
        })
        .map((field) => (
          <Facet
            key={field}
            field={field}
            label={formatLabel(field)}
            view={BetterMultiCheckboxFacet}
            filterType="any"
            hiddenOptions={["false"]}
          />
        ))}
    </div>
  );
}
