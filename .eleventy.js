const { DateTime } = require("luxon");
const nunjucks = require("nunjucks");

module.exports = function(eleventyConfig) {
  // Setup Nunjucks to throw on undefined variables
  const env = nunjucks.configure([], {
    throwOnUndefined: true,
  });
  eleventyConfig.setLibrary("njk", env);
  eleventyConfig.addLayoutAlias("default", "base.njk");

  // Add custom date filter
  eleventyConfig.addFilter("date", (value, format = "LLLL dd, yyyy") => {
    return DateTime.fromJSDate(new Date(value), { zone: 'utc' }).toFormat(format);
  });

  // Passthrough CSS file
  eleventyConfig.addPassthroughCopy({ "dist/style.css": "dist/style.css" });

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "_site",
    },
  };
};
