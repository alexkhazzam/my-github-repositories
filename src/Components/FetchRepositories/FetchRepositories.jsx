import React, { Component } from "react";
import axios from "axios";
import Repository from "../Repository/Repository";

class FetchRepositories extends Component {
  state = {
    repositories: [
      "imdb-api",
      "internship-GET-req",
      "screen-time-v2",
      "node-movie-database",
      "node-imdb-api",
      "middleware-file-hopping",
      "movie-time-v2",
      "async-number-increase",
      "tip-calculator",
      "chores-section",
    ],
    fetchErr: false,
  };

  async getDataAxios() {
    for (let i = 0; i <= this.state.repositories.length; i++) {
      const responseData = await axios.get(
        `https://api.github.com/search/repositories?q=${this.state.repositories[i]}&sort=stars&order=des`
      );
      console.log(responseData);
    }
  }

  render() {
    this.getDataAxios();
    return (
      <div>
        {this.state.fetchErr ? (
          <p>Oops! Something went wrong.</p>
        ) : (
          <Repository />
        )}
      </div>
    );
  }
}

export default FetchRepositories;
