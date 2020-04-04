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
import {Layout, MultiCheckboxFacet} from "@elastic/react-search-ui-views";

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

export default function App() {
  return (
    <SearchProvider config={config}>
      <WithSearch mapContextToProps={({wasSearched}) => ({wasSearched})}>
        {({wasSearched}) => {
          document.title = "CovidScholar - A knowledge portal for COVID-19 research built by the team behind Matscholar.";
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
                            <img className="covid-scholar-logo" src={logo} alt="logo"/>
                          </div>
                          <div className="sui-search-box__wrapper">
                            <input
                              {...getInputProps({
                                placeholder: "Search",
                                className: "input is-medium is-rounded",
                                style: {inputmode: "search"},
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
                      {wasSearched && <PagingInfo/>}
                      {wasSearched && <ResultsPerPage/>}
                    </React.Fragment>
                  }
                  bodyFooter={<Paging/>}
                />
                <div id="footer_container" className="content has-text-centered sui-layout-body">
                  <div className="columns is-centered">
                    <div className="column is-half is-size-6 "><p>This website uses natural language processing (NLP) to
                      power search on a set of research papers related to COVID-19. It was created by the team behind <a
                        href="https://www.matscholar.com">Matscholar</a>, a research effort led by the <a
                        href="https://hackingmaterials.lbl.gov">HackingMaterials</a>, <a
                        href="https://perssongroup.lbl.gov">Persson</a>, and <a
                        href="https://ceder.berkeley.edu">Ceder</a> research groups at Lawrence Berkeley National Lab.
                      The virus icon in our logo was made by Freepik from www.flaticon.com</p></div>
                  </div>
                  <div><a href="https://github.com/materialsintelligence/matscholar-web" target="_blank"
                          rel="noopener noreferrer" className="has-text-weight-bold">
                    About Matscholar</a><span> | </span><a
                    href="https://www.iubenda.com/privacy-policy/55585319" target="_blank" rel="noopener noreferrer"
                    className="has-text-weight-bold">Privacy Policy</a><span> | </span><a
                    href="https://discuss.matsci.org/c/matscholar" target="_blank" rel="noopener noreferrer"
                    className="has-text-weight-bold">Matscholar
                    Forum</a></div>
                  <div><span>Copyright © 2020 - Materials Intelligence</span></div>
                </div>
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
