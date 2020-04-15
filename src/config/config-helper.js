import config from "./engine.json";

/**
 * This file abstracts most logic around the configuration of the Reference UI.
 *
 * Configuration is an important part of the "reusability" and "generic-ness" of
 * the Reference UI, but if you are using this app as a starting point for own
 * project, everything related to configuration can largely be thrown away. To
 * that end, this file attempts to contain most of that logic to one place.
 */

export function getConfig() {
  if (process.env.NODE_ENV === "test") {
    return {};
  }

  if (config.engineName) return config;

  if (
    typeof window !== "undefined" &&
    window.appConfig &&
    window.appConfig.engineName
  ) {
    return window.appConfig;
  }

  return {};
}

function toLowerCase(string) {
  if (string) return string.toLowerCase();
}

function toUpperCase(string) {
  if (string) return string.toUpperCase();
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function getTitleField() {
  // If no title field configuration has been provided, we attempt
  // to use a "title" field, if one exists
  return getConfig().titleField || "title";
}

export function getUrlField() {
  return getConfig().urlField;
}

export function getFacetFields() {
  return getConfig().facets || [];
}

export function getSortFields() {
  return getConfig().sortFields || [];
}

function formatSortFieldName(sortField, direction) {
  if (sortField === "publication_date" && direction === "desc") {
    return "Publication Date (newest first)"
  } else if (sortField === "publication_date" && direction === "asc") {
    return "Publication Date (oldest first)"
  } else if (sortField === "is_covid19_ml") {
    return "Relevance to COVID-19 (most relevant first)"
  } else {
    return `${capitalizeFirstLetter(sortField)} ${toUpperCase(direction)}`
  }
}

export function getResultTitle(result) {
  const titleField = getTitleField();

  return result.getSnippet(titleField);
}

// Because if a field is configured to display as a "title", we don't want
// to display it again in the fields list
export function stripUnnecessaryResultFields(resultFields) {
  return Object.keys(resultFields).reduce((acc, n) => {
    if (
      [
        "_meta",
        "id",
        toLowerCase(getTitleField()),
        toLowerCase(getUrlField())
      ].includes(toLowerCase(n))
    ) {
      return acc;
    }

    acc[n] = resultFields[n];
    return acc;
  }, {});
}

export function buildSearchOptionsFromConfig() {
  const config = getConfig();
  const searchFields = (config.searchFields || config.fields || []).reduce(
    (acc, n) => {
      acc = acc || {};
      acc[n] = {};
      return acc;
    },
    undefined
  );

  const resultFields = (config.resultFields || config.fields || []).reduce(
    (acc, n) => {
      acc = acc || {};
      acc[n] = {
        raw: {},
        snippet: {
          size: 100,
          fallback: true
        }
      };
      return acc;
    },
    undefined
  );

  // We can't use url or title fields unless they're actually
  // in the reuslts.
  if (config.urlField) {
    resultFields[config.urlField] = {
      raw: {},
      snippet: {
        size: 100,
        fallback: true
      }
    };
  }

  if (config.titleField) {
    resultFields[config.titleField] = {
      raw: {},
      snippet: {
        size: 1000,
        fallback: true
      }
    };
  }

  if (config.abstractField) {
    resultFields[config.abstractField] = {
      raw: {},
      // snippet: {
      //   size: 300,
      //   fallback: true
      // }
    };
  }

  if (config.humanSummaryField) {
    resultFields[config.humanSummaryField] = {
      raw: {},
      snippet: {
        size: 1000,
        fallback: true
      }
    };
  }

  if (config.mlSummaryField) {
    resultFields[config.mlSummaryField] = {
      raw: {},
      snippet: {
        size: 1000,
        fallback: true
      }
    };
  }

  const searchOptions = {};
  searchOptions.result_fields = resultFields;
  searchOptions.search_fields = searchFields;
  return searchOptions;
}

export function buildFacetConfigFromConfig() {
  const config = getConfig();
  const facets = (config.facets || []).reduce((acc, n) => {
    acc = acc || {};
    acc[n] = {
      type: "value",
      size: 100
    };
    return acc;
  }, undefined);

  return facets;
}

export function buildSortOptionsFromConfig() {
  const config = getConfig();
  return [
    {
      name: "Relevance",
      value: "",
      direction: ""
    },
    ...(config.sortFields || []).reduce((acc, sortField) => {
      if (sortField === "publication_date"){
        acc.push({
          name: `${formatSortFieldName(sortField, "desc")}`,
          value: sortField,
          direction: "desc"
        });
      } else if (sortField === "is_covid19_ml") {
        acc.push({
          name: `${formatSortFieldName(sortField, "desc")}`,
          value: sortField,
          direction: "desc"
        });
      } else {
        acc.push({
          name: `${formatSortFieldName(sortField, "asc")}`,
          value: sortField,
          direction: "asc"
        });
        acc.push({
          name: `${formatSortFieldName(sortField, "desc")}`,
          value: sortField,
          direction: "desc"
        });
      }
      return acc;
    }, [])
  ];
}

export function buildAutocompleteQueryConfig() {
  const querySuggestFields = getConfig().querySuggestFields;
  if (
    !querySuggestFields ||
    !Array.isArray(querySuggestFields) ||
    querySuggestFields.length === 0
  ) {
    return {};
  }

  return {
    suggestions: {
      types: {
        documents: {
          fields: getConfig().querySuggestFields
        }
      }
    }
  };
}
