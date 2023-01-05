const { minify } = require("terser");
const postCss = require('postcss');
const clean = require('postcss-clean');
const autoprefixer = require("autoprefixer");

module.exports = function (eleventyConfig) {

  eleventyConfig.addPassthroughCopy("src/static");
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

  eleventyConfig.addNunjucksAsyncFilter('postcss', (cssCode, done) => {
    postCss([
      autoprefixer(),
      clean()
    ])
    .process(css, { from: undefined })
    .then(
      r => done(null, r.css),
      e => done(e, null)
    )
  })

  // eleventyConfig.addFilter("cssmin", function(code) {
	// 	return new CleanCSS({
  //     compatibility: '*',
  //     format: 'beautify'
  //   }
  //   ).minify(code).styles;
	// });

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
      input: "src/",
      includes: "_includes/",            
      data: "_data/",
      output: "_site/"
    }
  };
}