import React from "react";
import classes from "./Header.css";
import { getTenantCode } from "../../utils/urlUtils";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const Header = ({ logoFilePath }) => {

  return (
    <header className={classes.header}>
      <div className={classes.wrap}>
        <Link to={`/${getTenantCode()}`}>
          <img className={classes.logo} src={logoFilePath} alt="" />
        </Link>
      </div>
    </header>
  );
};

export default connect(state => ({
  logoFilePath: state.webConfig.logoFilePath
}))(Header);
