import Layout from "@theme/Layout";
import React, { FC } from "react";
import { translate } from "@docusaurus/Translate";

const ApplicationLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Layout
      title={translate({ id: "meta_title" })}
      description={translate({ id: "meta_desc" })}
    >
      <div className="max-w-screen-xl m-auto px-4 md:px-0 wiki-article-content">
        {children}
      </div>
    </Layout>
  );
};
export default ApplicationLayout;
