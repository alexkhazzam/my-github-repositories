import React from "react";
import "./Repository.css";

const Repository = (props) => {
  return (
    <div className={"repo"}>
      <h2 className={"repo__header"}>{props.title}</h2>
      <h3 className={"repo__author"}></h3>
      <p className={"repo__item"}>{props.description}</p>
      <p className={"repo__item"}>{props.forks}</p>
      <p className={"repo__item"}>{props.stars}</p>
      <p className={"repo__item"}>{props.appUrl}</p>
      <p className={"repo__item"}>{props.projUrl}</p>
      <p className={"repo__item"}>{props.recentCommit}</p>
    </div>
  );
};

export default Repository;
