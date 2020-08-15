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
    pageNumber: 1,
  };

  async getDataAxios() {
    const responseData = await axios.get(
      `https://api.github.com/search/users?q=alex+repos:%3E30&page=${this.state.pageNumber}`
    );
    console.log(responseData);
    for (let k = 0; k <= responseData.data.items.length; k++) {
      let username = responseData.data.items[k].login;
      console.log(username);
      if (username === "alexkhazzam") {
        alert("found");
      } else {
        this.setState({ pageNumber: this.state.pageNumber++ });
        this.getDataAxios();
      }
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
