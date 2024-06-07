import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import React, { FC } from "react";

const ApplicationLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} description="LongPort Wiki">
      <div className="max-w-screen-xl m-auto">
        {children}
      </div>
    </Layout>
  )
};
export default ApplicationLayout;
