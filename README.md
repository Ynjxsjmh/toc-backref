
# Introduction

This lib will automatically generate table of content for you at the beginning of your targeted selector. With this lib, you can both jump from toc to header and jump back to toc from header.

# Requirements

jQuery

# Installation

Add JS and CSS to your project.

# Usage

Add the following code to your proper file with `<script></script>` around.

```
$.generateToc('.post-container .post-content', ['h1', 'h2', 'h3']);
```

- The first parameter is the selector of your post content.
- The second parameter is the header tag you want to have this function.
- The third parameter is an optional bool value, default is `true`. Have a try to see what it does.

