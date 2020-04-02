
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

If you already have a table of content thus don't want to generate it again, you can use the function below.

```
$.generateBackRef('.post-content ul:first-of-type', '.post-container .post-content', ['h1', 'h2', 'h3']);
```

- The first parameter is the selector of your toc, you'd better accurate it to ul tag. Note that the toc should be a valid toc which means subheading should be surrounded by ul tag rather than what I do in `generateToc`. It's not difficult to make the toc generated by `generateToc` a valid toc, but I'm just to lazy to do that.
- The remaining parameters keep the same with function `generateToc`.

