import React from "react";
import "./Repository.css";
import forkImg from "../../assets/images/fork.png";
import starImg from "../../assets/images/star.png";
import languageImg from "../../assets/images/language.png";
import websiteUrlImg from "../../assets/images/website-url.png";
import codeUrlImg from "../../assets/images/code-url.png";
import recentCommitImg from "../../assets/images/recent-commit.png";
import descriptionImg from "../../assets/images/description.png";

const Repository = (props) => {
  let color = "none";
  switch (props.language) {
    case "JavaScript":
      color = "yellow";
      break;
    case "Swift":
      color = "orange";
      break;
    case "Python":
      color = "blue";
      break;
    case "Rust":
      color = "brown";
      break;
    case "Java":
      color = "red";
      break;
    case "HTML":
      color = "red";
      break;
    case "CSS":
      color = "blue";
      break;
    case "VB":
      color = "purple";
      break;
    case "C++":
      color = "blue";
      break;
    case "C":
      color = "blue";
      break;
    case "C#":
      color = "blue";
      break;
    case "PHP":
      color = "blue";
      break;
    case "Objective-C":
      color = "blue";
      break;
    case "Ruby":
      color = "red";
      break;
    case "Scala":
      color = "red";
      break;
    default:
      color = "none";
  }

  return (
    <div className={"repo"}>
      <h2 className={"repo__header"}>{props.title}</h2>
      <p className={"repo__item description"}>
        <img src={descriptionImg} width="20" height="20" className={"icon"} />
        <span>Description: </span>
        {props.description}
      </p>
      <p className={"repo__item"}>
        <img src={forkImg} width="20" height="20" className={"icon"} />
        <span>Forks: </span>
        {props.forks}
      </p>
      <p className={"repo__item"}>
        <img src={starImg} width="20" height="20" className={"icon"} />
        <span>Stargazers Count: </span>
        {props.stars}
      </p>
      <p className={"repo__item"}>
        <img src={languageImg} width="20" height="20" className={"icon"} />
        <span>Language: </span>
        {props.language}
        <span className={color}></span>
      </p>
      <p className={"repo__item"}>
        <img src={websiteUrlImg} width="20" height="20" className={"icon"} />
        <span>Website URL: </span>
        <a href={props.appUrl} target="_blank" rel="noopenrer noreferrer">
          {props.appUrl}
        </a>
      </p>
      <p className={"repo__item"}>
        <img src={codeUrlImg} width="20" height="20" className={"icon"} />
        <span>Code URL: </span>
        <a href={props.projUrl} target="_blank" rel="noopenrer noreferrer">
          {props.projUrl}
        </a>
      </p>
      <p className={"repo__item"}>
        <img src={recentCommitImg} width="20" height="20" className={"icon"} />
        <span>Most Recent Commit: </span>
        {props.recentCommit}
      </p>
    </div>
  );
};

export default Repository;
