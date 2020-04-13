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
import "../assets/bulma-helpers.css";
import "../assets/bulma.css";
import "../assets/covidscholar.css";
import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  buildSortOptionsFromConfig,
  getConfig,
  getFacetFields,
} from "../config/config-helper";

import ResultView from "../components/ResultView";

import logo from "../assets/covscholar_logo_V2.png";
import NavigationBar from "./NavigationBar";
import { Image, Navbar } from "react-bootstrap";
import FilterSideBar from "./FilterSideBar";

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

export default function SearchApp() {
  return (
    <SearchProvider config={config}>
      <WithSearch
        mapContextToProps={({ wasSearched, isLoading }) => ({
          wasSearched,
          isLoading,
        })}
      >
        {({ wasSearched, isLoading }) => {
          return (
            <div className="App">
              <ErrorBoundary>
                <Layout
                  header={
                    <div>
                      <Navbar.Brand href="/">
                        <Image
                            src={require("../assets/covscholar_logo_V2.png")}
                            width="200"
                            className="d-inline-block align-top"
                            // alt="Covid Scholar logo"
                        />
                      </Navbar.Brand>
                      <div>
                        <SearchBox
                          autocompleteSuggestions={true}
                          inputView={({
                            getAutocomplete,
                            getInputProps,
                            getButtonProps,
                          }) => (
                            <>
                              <div className="sui-search-box__wrapper column">
                                <h5 className="has-margin-left-30 has-margin-right-30">
                                  {" "}
                                  Search more than 44,000 papers related to
                                  COVID-19
                                </h5>
                                <input
                                  {...getInputProps({
                                    placeholder: "Search",
                                    className: "input is-medium is-rounded is-marginless",
                                    style: { inputmode: "search" },
                                    autoFocus: true,
                                  })}
                                />
                                {getAutocomplete({
                                    className: "zindex-popover is-marginless"
                                })}
                              </div>
                            </>
                          )}
                        />
                      </div>
                    </div>
                  }
                  sideContent={FilterSideBar(wasSearched)}
                  bodyContent={
                    <div>
                      {isLoading && <div>Loading...</div>}
                      {!isLoading && (
                        <Results
                          titleField={getConfig().titleField}
                          urlField={getConfig().urlField}
                          shouldTrackClickThrough={true}
                          resultView={ResultView}
                        />
                      )}
                    </div>
                  }
                  bodyHeader={
                    <React.Fragment>
                      {wasSearched && <PagingInfo />}
                      {wasSearched && <ResultsPerPage />}
                    </React.Fragment>
                  }
                  bodyFooter={!isLoading && <Paging totalPages={20} />}
                />
              </ErrorBoundary>
            </div>
          );
        }}
      </WithSearch>
    </SearchProvider>
  );
}
