import React, { Component} from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';

import SearchApp from "./components/SearchApp"
import NavigationBar from "./components/NavigationBar"
import Layout from "./components/Layout"
import About from "./components/About"
// import { TwitterTimelineEmbed } from "react-twitter-embed";


class App extends Component {
  render() {
    return (
        <React.Fragment>
          <BrowserRouter>
            <Layout>
              <Switch>
                <Route exact path="/" component={SearchApp} />
                <Route path="/about" component={About} />
                <Route component={Error} />
              </Switch>
            </Layout>
          </BrowserRouter>
        </React.Fragment>
    );
  }
}

export default App;

// <div className="selfCenter spaceBetween standardWidth">
//   <TwitterTimelineEmbed
//       sourceType="list"
//       id="1246182907200172035"
//       theme="light"
//       noHeader
//       options={{height: 800}}
//   />
// </div>
