import React, {Component} from 'react';
import Test from "./Test";

class App extends Component {
  handleClick = () =>{
    console.log('div')
  }

  render() {
    return (
      <div>
        <div onClick={this.handleClick}>click</div>
        <Test/>
      </div>
    );
  }
}

export default App;