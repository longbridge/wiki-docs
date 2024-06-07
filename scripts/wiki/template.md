---
title: "<%= title %>"
slug: "<%= pageSlug %>"
id: "<%= id %>"
hide_table_of_contents: true
---

import {ArticleMeta} from '@site/src/components/article-meta'
import {Breadcrumbs} from '@site/src/components/breadcrumbs'

<Breadcrumbs current="<%= title %>" />

# <%= title %>

<ArticleMeta viewCount={<%= id %>} updatedAt={'<%=contentUpdatedAt%>'} />
<div className='border-solid border-b border-t-0 my-4 border-[var(--ifm-color-gray-300)]' />

<%= body || description %>
