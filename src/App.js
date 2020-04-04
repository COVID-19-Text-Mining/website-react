import React from "react";

import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Facet,
  SearchProvider,
  SearchBox,
  Results,
  PagingInfo,
  ResultsPerPage,
  Paging,
  Sorting,
  WithSearch,
} from "@elastic/react-search-ui";
import { Layout, MultiCheckboxFacet } from "@elastic/react-search-ui-views";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "./assets/bulma-helpers.css";
import "./assets/bulma.css";
import "./assets/covidscholar.css";
import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields,
} from "./config/config-helper";

import ResultView from "./components/ResultView";

import logo from './covidscholar_logo_cascade.png';

// import { TwitterTimelineEmbed } from "react-twitter-embed";

const { hostIdentifier, searchKey, endpointBase, engineName } = getConfig();
const connector = new AppSearchAPIConnector({
  searchKey,
  engineName,
  hostIdentifier,
  endpointBase,
});
const config = {
  searchQuery: {
    facets: buildFacetConfigFromConfig(),
    ...buildSearchOptionsFromConfig(),
    disjunctiveFacets: ["journal"],
  },
  autocompleteQuery: buildAutocompleteQueryConfig(),
  apiConnector: connector,
  alwaysSearchOnInitialLoad: true,
};

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({ wasSearched }) => ({ wasSearched })}>
        {({ wasSearched }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <SearchBox
                      autocompleteSuggestions={true}
                      inputView={({
                        getAutocomplete,
                        getInputProps,
                        getButtonProps,
                      }) => (
                        <>
                          <div className="is-quarter-width">
                            <img className="covid-scholar-logo" src={logo}/>
                          </div>
                          <div className="sui-search-box__wrapper">
                            <input
                              {...getInputProps({
                                placeholder: "Search",
                                className: "input is-medium is-rounded",
                                style: { inputmode: "search" },
                                autoFocus: true
                              })}
                            />
                            {getAutocomplete()}
                          </div>
                          <input
                            {...getButtonProps({
                              className: "button is-large is-rounded is-hidden",
                            })}
                          />
                        </>
                      )}
                    />
                  }
                  sideContent={
                    <div>
                      {wasSearched && (
                        <Sorting
                          label={"Sort by"}
                          sortOptions={buildSortOptionsFromConfig()}
                        />
                      )}
                      {getFacetFields().map((field) => (
                        <Facet
                          key={field}
                          field={field}
                          label={field}
                          view={MultiCheckboxFacet}
                          filterType="any"
                        />
                      ))}
                    </div>
                  }
                  bodyContent={
                    <Results
                      titleField={getConfig().titleField}
                      urlField={getConfig().urlField}
                      shouldTrackClickThrough={true}
                      resultView={ResultView}
                    />
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}

// <div className="selfCenter spaceBetween standardWidth">
//   <TwitterTimelineEmbed
//       sourceType="list"
//       id="1246182907200172035"
//       theme="light"
//       noHeader
//       options={{height: 800}}
//   />
// </div>
