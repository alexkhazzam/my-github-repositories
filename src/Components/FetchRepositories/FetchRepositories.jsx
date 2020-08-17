import React, { Component } from "react";
import axios from "axios";
import Repository from "../Repository/Repository";
import "bootstrap/dist/css/bootstrap.min.css";
import "./FetchRepositories.css";
import SVG1 from "../SVGs/SVG1";

class FetchRepositories extends Component {
  state = {
    repositoryData: [],
    fetchErr: false,
    gitUsername: "",
    invalidInput: null,
    requestComplete: null,
    repositoryCount: 0,
    paginationSection: null,
    pages: 0,
  };

  fetchRepositories = (event, bool) => {
    if (bool) {
      event.preventDefault();
    }
    if (this.state.gitUsername === "") {
      return this.setState({ invalidInput: <p>This is a required field.</p> });
    } else {
      this.setState({ repositoryData: [] });
      this.setState({ invalidInput: null });
      this.setState({ requestComplete: false });
      axios
        .get(
          `https://api.github.com/users/${
            this.state.gitUsername
          }/repos?per_page=${100}`
        )
        .then((repoObj) => {
          let repoCount;
          if (!bool) {
            repoCount = this.state.repositoryCount;
          } else {
            repoCount = 0;
          }
          this.setState({ fetchErr: false });
          const repoData = [...this.state.repositoryData];
          const responseData = repoObj.data;
          responseData.forEach((repo) => {
            repoCount++;
            repoData.push(repo);
          });
          this.setState({ repositoryData: repoData });
          this.setState({ requestComplete: true });
          this.setState({
            repositoryCount: this.state.repositoryCount + repoCount,
          });
          // if (repoCount === 100) {
          //   this.setState({ pages: this.state.pages + 1 });
          // }
          // if (this.state.repositoryCount / 100 <= this.state.pages) {
          //   console.log(
          //     `finished ${this.state.pages} ${this.state.repositoryCount}`
          //   );
          //   console.log(this.state.repositoryCount / 100);
          //   this.fetchRepositories(null, false);
          // }
        })
        .catch((err) => {
          if (err) {
            this.setState({ fetchErr: true });
            this.setState({ requestComplete: true });
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
            title={repo.name}
            description={repo.description}
            forks={repo.forks}
            stars={repo.stargazers_count}
            language={repo.language}
            appUrl={`${this.state.gitUsername}.github.io/${repo.name}`}
            projUrl={repo.html_url}
            recentCommit={repo.pushed_at}
            key={repo.id}
          />
        );
      });
    } else if (this.state.gitUsername === "") {
      repositories = null;
    }

    if (this.state.requestComplete === true && !this.state.fetchErr) {
      this.state.paginationSection = (
        <div className="pagination">
          <button
            className="previous-page btn btn-info"
            disabled="true
          "
          >
            Previous Page
          </button>
          <input
            type="readonly"
            className="form-control pagination-container"
            placeholder="Page Count: 10000"
          />
          <button className="next-page btn btn-info">Next Page</button>
        </div>
      );
    } else {
      this.state.paginationSection = null;
    }

    return (
      <div className="main-container">
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
              onClick={(event) => this.fetchRepositories(event, true)}
            >
              Fetch Repos
            </button>
          </form>
        </div>
        {this.state.paginationSection}
        {this.state.requestComplete === false ? (
          <div className="svg-container">
            <SVG1 className="svg" />
            <SVG1 className="svg" />
            <SVG1 className="svg" />
          </div>
        ) : null}
        <div>{this.state.fetchErr ? null : repositories}</div>
      </div>
    );
  }
}

export default FetchRepositories;
