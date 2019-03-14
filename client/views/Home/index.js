import React, { useEffect } from "react";
import classes from "./index.less";
import { fetchMainPage } from "./store/action";
import { connect } from "react-redux";

const Home = props => {
  useEffect(() => {
    if (!props.hasData) {
      props.fetchMainPage();
    }
  }, []);

  return (
    <div className={classes.wrap}>
      {props.banner.map(item => {
        return <img src={item.file_path} key={item.id} alt="" />;
      })}
    </div>
  );
};

Home.loadData = store => {
  return store.dispatch(fetchMainPage());
};

export default connect(
  state => ({ ...state.home }),
  { fetchMainPage }
)(Home);
