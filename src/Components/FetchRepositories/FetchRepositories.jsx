import React, { Component } from "react";
import axios from "axios";
import Repository from "../Repository/Repository";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FetchRepositories.css";

class FetchRepositories extends Component {
  state = {
    repositoryData: [],
    fetchErr: false,
    gitUsername: null,
    invalidInput: null,
    HTTPRequests: 0,
  };

  fetchRepositories = (event) => {
    event.preventDefault();
    if (this.state.gitUsername === null) {
      return this.setState({ invalidInput: <p>This is a required field.</p> });
    } else {
      this.setState({ invalidInput: null });
      axios
        .get(
          `https://api.github.com/users/${
            this.state.gitUsername
          }/repos?per_page=${100}`
        )
        .then((repoObj) => {
          this.setState({ fetchErr: false });
          this.setState({ repositoryData: [] });
          const repoData = [...this.state.repositoryData];
          const responseData = repoObj.data;
          responseData.forEach((repo) => {
            repoData.push(repo);
          });
          this.setState({ repositoryData: repoData });
        })
        .catch((err) => {
          if (err) {
            this.setState({ fetchErr: true });
            throw err;
          }
        });
    }
  };

  setUsername = (event) => {
    this.setState({ gitUsername: event.target.value.trim() });
  };

  render() {
    let repositories = <p>Oops! Username not found.</p>;
    if (!this.state.fetchErr) {
      repositories = this.state.repositoryData.map((repo) => {
        return (
          <Repository
            title={repo.title}
            author={repo.author}
            description={repo.description}
            forks={repo.forks}
            stars={repo.stars}
            appUrl={repo.url}
            projUrl={repo.html_url}
            recentCommit={repo.pushed_at}
            key={repo.id}
          />
        );
      });
    }

    return (
      <div>
        <div className="mt-5 form-wrapper">
          <form className="form-container">
            <input
              className="form-control"
              type="text"
              placeholder="Github Username"
              onChange={(event) => this.setUsername(event)}
              required
            />
            {this.state.invalidInput}
            {this.state.fetchErr ? repositories : null}
            <button
              className="btn btn-info"
              type="submit"
              onClick={(event) => this.fetchRepositories(event)}
            >
              Fetch Repos
            </button>
          </form>
        </div>
        {this.state.fetchErr ? null : repositories}
      </div>
    );
  }
}

export default FetchRepositories;
