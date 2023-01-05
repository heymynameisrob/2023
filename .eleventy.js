const { minify } = require("terser");
const postCss = require('postcss');
const clean = require('postcss-clean');
const autoprefixer = require("autoprefixer");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addWatchTarget('./src/styles.css');
  eleventyConfig.addWatchTarget('./src/main.js');
  
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