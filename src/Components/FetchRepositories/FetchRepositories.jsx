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
    finalRepoData: {},
    pageNumber: 0,
    currentPage: 1,
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
          }/repos?per_page=${100}&page=${this.state.pageNumber}`
        )
        .then((repoObj) => {
          let repoCount = 0;
          if (bool) {
            this.setState({ repositoryCount: 0 });
          }
          this.setState({ fetchErr: false });
          const repoData = [];
          const responseData = repoObj.data;
          responseData.forEach((repo) => {
            repoCount++;
            repoData.push(repo);
          });
          const data = { ...this.state.finalRepoData };
          data[this.state.pageNumber] = repoData;
          this.setState({ finalRepoData: data });
          this.setState({ requestComplete: true });
          this.setState({
            repositoryCount: this.state.repositoryCount + repoCount,
          });
          this.setState({ repositoryData: repoData });
          if (repoCount === 100) {
            this.state.pageNumber++;
            this.fetchRepositories(null, false);
          }
          console.log(this.state.finalRepoData);
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

  fetchNextPage = () => {
    this.setState({ currentPage: this.state.currentPage + 1 });
    const respData = this.state.repositoryData[this.state.currentPage];
    for (const data in this.state.finalRepoData) {
      console.log(data === respData);
    }
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
            appUrl={
              !repo.has_pages
                ? null
                : `https://${repo.owner.login}.github.io/${repo.name}`
            }
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
          <p className="current-page">
            Current Page: <span>{this.state.currentPage}</span>
          </p>
          <button
            className="previous-page btn btn-info"
            disabled={() => this.checkCurrentPageNumber()}
          >
            Previous Page
          </button>
          <p>
            Page Count: <span>{this.state.pageNumber}</span>
          </p>
          <button
            className="next-page btn btn-info"
            onClick={() => this.fetchNextPage()}
          >
            Next Page
          </button>
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
              Fetch Repositories
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
