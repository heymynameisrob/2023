const { minify } = require("terser");
const CleanCSS = require("clean-css");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("static/");
  eleventyConfig.addNunjucksAsyncFilter("jsmin", async function (
    code,
    callback
  ) {
    try {
      const minified = await minify(code);
      callback(null, minified.code);
    } catch (err) {
      console.error("Terser error: ", err);
      // Fail gracefully.
      callback(null, code);
    }
  });

  eleventyConfig.addFilter("cssmin", function(code) {
		return new CleanCSS({
      compatibility: '*',
      format: 'beautify'
    }
    ).minify(code).styles;
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

    // These are all optional, defaults are shown:
    dir: {
      input: ".",
      includes: "_includes",
      data: "_data",
      output: "_site"
    }
  };
}