import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import "./App.css";
import Home from "./Home";
import { queryString } from "../utils/urlUtils";
import apiFetch from "../utils/apiFetch";

const App = props => {
  useEffect(() => {
    let qs = queryString(window.location.search);
    apiFetch.post(
      "/api/bms/index.php?r=CzSupplier/api/run&o=znjs&p=cgsupplier.common.site-config"
    ).then(data=>{
      console.log(data);
    })

  }, []);

  return (
    <>
      <Route path="/:tenant" component={Home} />
    </>
  );
};

export default App;
