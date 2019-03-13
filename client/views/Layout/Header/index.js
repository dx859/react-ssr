import React from "react";
import classes from "./header.css";
import { connect } from "react-redux";
import AppLink from "../../../components/AppLink";

const Header = ({ logoFilePath }) => {
  return (
    <header className={classes.header}>
      <div className={classes.wrap}>
        <AppLink to="/">
          <img className={classes.logo} src={logoFilePath} alt="" />
        </AppLink>
      </div>
    </header>
  );
};

export default connect(state => ({
  logoFilePath: state.webConfig.logoFilePath
}))(Header);
