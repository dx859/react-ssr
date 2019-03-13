import React from "react";
import { Link, withRouter } from "react-router-dom";

const AppLink = ({ match, to, className, children }) => (
  <Link className={className} to={`/${match.params.tenant}${to}`}>
    {children}
  </Link>
);

export default withRouter(AppLink);
