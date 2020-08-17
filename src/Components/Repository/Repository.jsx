import React from "react";
import "./Repository.css";

const Repository = (props) => {
  return (
    <div className={"repo"}>
      <h2 className={"repo__header"}>{props.title}</h2>
      <p className={"repo__item description"}>
        <span>Description: </span>
        {props.description}
      </p>
      <p className={"repo__item"}>
        <span>Forks: </span>
        {props.forks}
      </p>
      <p className={"repo__item"}>
        <span>Stargazers Count: </span>
        {props.stars}
      </p>
      <p className={"repo__item"}>
        <span>Language: </span>
        {props.language}
      </p>
      <p className={"repo__item"}>
        <span>Website URL: </span>
        <a href={props.appUrl} target="_blank">
          {props.appUrl}
        </a>
      </p>
      <p className={"repo__item"}>
        <span>Code URL: </span>
        <a href={props.projUrl} target="_blank">
          {props.projUrl}
        </a>
      </p>
      <p className={"repo__item"}>
        <span>Most Recent Commit: </span>
        {props.recentCommit}
      </p>
    </div>
  );
};

export default Repository;
