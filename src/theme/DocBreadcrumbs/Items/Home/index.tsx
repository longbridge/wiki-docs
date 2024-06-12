/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react';
import Link from '@docusaurus/Link';
import {translate} from '@docusaurus/Translate';
import IconHome from '@theme/Icon/Home';

import styles from './styles.module.css';
import { useBasenameLocale } from "@site/src/utils";

export default function HomeBreadcrumbItem(): JSX.Element {
  const locale = useBasenameLocale();
  const homeHref = `/${locale}/learn`;

  return (
    <li className="breadcrumbs__item">
      <Link
        aria-label={translate({
          id: 'theme.docs.breadcrumbs.home',
          message: 'Home page',
          description: 'The ARIA label for the home page in the breadcrumbs',
        })}
        className="breadcrumbs__link"
        href={homeHref}>
        <IconHome className={styles.breadcrumbHomeIcon} />
      </Link>
    </li>
  );
}
