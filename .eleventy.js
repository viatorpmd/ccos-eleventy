const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  eleventyConfig.addFilter("date", (value, format = "MMMM dd, yyyy") => {
    if (!value) return '';
    return DateTime.fromJSDate(new Date(value)).toFormat(format);
  });

  eleventyConfig.addPassthroughCopy("src/css"); 
  // Ensures CSS files are copied to _site so they load correctly

  return {
    dir: {
      input: "src",
      includes: "_includes",
      output: "_site"
    }
  };
};
