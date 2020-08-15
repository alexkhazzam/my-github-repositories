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

  componentDidMount() {
    for (let i = 0; i <= this.state.repositories.length; i++) {
      axios
        .get(
          `https://api.github.com/search/repositories?q=${this.state[i]}react-native&sort=stars&order=des`
        )
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          if (error) {
            this.setState({ fetchErr: true });
            throw error;
          }
        });
    }
  }

  render() {
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
