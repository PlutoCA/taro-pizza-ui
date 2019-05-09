import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "at-ui-style";

import Index from "./page/index.jsx";
import Docs from "./page/docs.jsx";

function App() {
  return (
    <Router>
      <div className="wrapper" style={{ backgroundColor: "#F8FAFF" }}>
        <Switch>
          <Route path="/" exact component={Index} />
          <Route path="/docs" component={Docs} />

          {/* <Route path="/guide" component={Guide} /> */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
