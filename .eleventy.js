const { minify } = require("terser");
const postCss = require('postcss');
const clean = require('postcss-clean');
const autoprefixer = require("autoprefixer");
const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addWatchTarget('./src/styles.css');
  eleventyConfig.addWatchTarget('./src/main.js');  

  eleventyConfig.addFilter("postDate", (dateObj) => {
    return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
  });


  
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

    pathPrefix: "/", // useful for GitHub pages

    dir: {
      input: "src",
      includes: "_includes",            
      data: "_data",
      output: "_site"
    }
  };
}