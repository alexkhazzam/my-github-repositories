import React, { Component } from "react";
import axios from "axios";
import Repository from "../Repository/Repository";

class FetchRepositories extends Component {
  state = {
    repositoryData: [],
    fetchErr: false,
    gitUsername: "alexkhazzam",
  };

  componentDidMount() {
    axios
      .get(
        `https://api.github.com/users/${
          this.state.gitUsername
        }/repos?per_page=${100}`
      )
      .then((repoObj) => {
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

  render() {
    let repositories = <p>Oops! Something went wrong.</p>;
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
    return <div>{repositories}</div>;
  }
}

export default FetchRepositories;
