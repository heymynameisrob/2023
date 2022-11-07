const { DateTime } = require("luxon");
const fs = require("fs");
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("static/");

  eleventyConfig.addFilter("readableDate", dateObj => {
    return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("LLL yy");
  });

  eleventyConfig.addLayoutAlias("post", "layouts/post.njk");

  let markdownLibrary = markdownIt({
    html: true,
    breaks: true,
    linkify: true
  })
  eleventyConfig.setLibrary("md", markdownLibrary);


  return {
    templateFormats: [
      "md",
      "njk",
      "html",
      "liquid"
    ],

    markdownTemplateEngine: "liquid",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk",

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}