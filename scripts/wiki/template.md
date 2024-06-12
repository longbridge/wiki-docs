---
title: "<%= title %>"
slug: "<%= pageSlug %>"
id: "<%= id %>"
hide_table_of_contents: true
---

import {ArticleMeta} from '@site/src/components/article-meta'

# <%= title %>

<ArticleMeta id={<%= id %>} updatedAt={'<%=contentUpdatedAt%>'} />
<div className='border-solid border-b border-t-0 my-4 border-[var(--ifm-color-gray-300)]' />

<%= body || description %>
