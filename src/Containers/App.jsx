import React, { Component } from "react";
import FetchRepositories from "../Components/FetchRepositories/FetchRepositories";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <FetchRepositories />
      </div>
    );
  }
}
export default App;
