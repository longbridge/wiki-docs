/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useState } from "react";
import BackToTopButton from "@theme/BackToTopButton";
import DocRootLayoutMain from "./Main";
import type { Props } from "@theme/DocRoot/Layout";

import styles from "./styles.module.css";

export default function DocRootLayout({ children }: Props): JSX.Element {
  const [hiddenSidebarContainer] = useState(false);
  return (
    <div className={styles.docsWrapper}>
      <BackToTopButton />
      <div className={styles.docRoot}>
        <DocRootLayoutMain hiddenSidebarContainer={hiddenSidebarContainer}>
          {children}
        </DocRootLayoutMain>
      </div>
    </div>
  );
}
