import React, { FC } from "react";
import { IWiki } from "@site/src/types";

interface IWikiContentProps {
  data: IWiki
  [k: string]: any;
}

const WikiContent: FC<IWikiContentProps> = props => {
  const { data } = props;
  console.log("use data: ", data)
  return <article className={"wiki-conent"}>
    <h1>{data.title}</h1>
    <div dangerouslySetInnerHTML={{ __html: data.body || data.description }}></div>
  </article>;
};

export default WikiContent;
