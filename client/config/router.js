import React from "react";
import { Route, Redirect } from "react-router-dom";
import Layout from "../views/Layout";
import NotFound from "../views/NotFound/NotFound";

export default () => [
  <Route
    key="redirect"
    exact
    path="/hello"
    render={() => <Redirect to="/znjs" />}
  />,
  <Route key="/404" path="/404" component={NotFound} />,
  <Route key="/" path="/:tenant" component={Layout} />
];

// import Home from "../views/Home";

// export default [
//   {
//     path: "/:tenant",
//     component: Layout,
//     key: "home",
//     routes: [
//       {
//         path: "/:tenant",
//         exact: true,
//         component: Home
//       }
//     ]
//   }
// ];
