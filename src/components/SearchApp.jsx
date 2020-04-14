import React from "react";
import AppSearchAPIConnector from "@elastic/search-ui-app-search-connector";

import {
  ErrorBoundary,
  Paging,
  PagingInfo,
  Results,
  ResultsPerPage,
  SearchBox,
  SearchProvider,
  WithSearch,
} from "@elastic/react-search-ui";
import {Layout,} from "@elastic/react-search-ui-views";

import {
  buildAutocompleteQueryConfig,
  buildFacetConfigFromConfig,
  buildSearchOptionsFromConfig,
  getConfig,
} from "../config/config-helper";

import ResultView from "../components/ResultView";

import logo from "../covidscholar_logo.png";
import {Sticky} from 'react-sticky';
import {Image, Navbar} from "react-bootstrap";
import FilterSideBar from "./FilterSideBar";

import "@elastic/react-search-ui-views/lib/styles/styles.css";
import "./SearchApp.css"

const {hostIdentifier, searchKey, endpointBase, engineName} = getConfig();
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
            mapContextToProps={({wasSearched, isLoading}) => ({
              wasSearched,
              isLoading,
            })}>
          {({wasSearched, isLoading}) => {
            return (
                <div className="App">
                  <ErrorBoundary>
                    <Layout
                        header={
                          <Sticky topOffset={56}>{({style}) =>
                              <nav className={"nav search-nav"} style={style}>
                                <Navbar.Brand href="/" className={"text-center"}>
                                  <Image
                                      src={logo}
                                      className="d-inline-block align-top"
                                      // alt="Covid Scholar logo"
                                  />
                                </Navbar.Brand>
                                <div className={"nav-search-bar"}>
                                  <SearchBox
                                      autocompleteSuggestions={true}
                                      inputView={({
                                                    getAutocomplete,
                                                    getInputProps,
                                                    // getButtonProps,
                                                  }) => (
                                          <div className="sui-search-box__wrapper column">
                              <span className="pl-1 pr-5 search-help-text">
                                {" "}
                                Search more than 44,000 COVID-19 papers
                              </span>
                                            <input
                                                {...getInputProps({
                                                  placeholder: "Search",
                                                  className: "form-control form-rounded m-0",
                                                  style: {inputmode: "search"},
                                                  autoFocus: true,
                                                })}
                                            />
                                            {getAutocomplete({
                                              className: "zindex-popover m-0"
                                            })}
                                          </div>
                                      )}
                                  />
                                </div>
                              </nav>}
                          </Sticky>
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
                            {wasSearched && <PagingInfo/>}
                            {wasSearched && <ResultsPerPage/>}
                          </React.Fragment>
                        }
                        bodyFooter={!isLoading && <Paging totalPages={20}/>}
                    />
                  </ErrorBoundary>
                </div>
            );
          }}
        </WithSearch>
      </SearchProvider>
  );
}
