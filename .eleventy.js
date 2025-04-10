const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("date", (value, format = "MMMM dd, yyyy") => {
    if (!value) return '';
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  eleventyConfig.addPassthroughCopy("src/static");

  return {
    dir: {
      input: "src",
      includes: "_includes",
      layouts: "_includes/layouts",
      output: "_site"
    }
  };
};
