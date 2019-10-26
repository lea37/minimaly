const { DateTime }  = require("luxon");
const pluginRss     = require("@11ty/eleventy-plugin-rss");

// Import data files to use it for collections
const site = require('./src/_data/site.json');

module.exports = function(config) {
    // Copy files for services worker purpose and images
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy({"src/js/service-worker.js": "service-worker.js"});
    config.addPassthroughCopy({ "src/_includes/css/main.min.css": "css/main.min.css" });
    config.addPassthroughCopy({ "src/_includes/js/main.min.js": "js/main.min.js" });

    // Date format with luxon
    config.addFilter("dateDisplay", require("./src/filters/date.js") );

    config.addPlugin(pluginRss);

    config.addTransform("htmlmin", require("./src/filters/minify-html.js"));

    // Posts collection
    config.addCollection("posts", function(collection) {
      return collection.getFilteredByGlob("./src/posts/*.md").reverse();
    });

    // Home collection
    config.addCollection('lastPosts', collection => {
        return [...collection.getFilteredByGlob('./src/posts/*.md')]
          .reverse()
          .slice(0, site.maxPostsPerPage);
    });

    // Custom src => output folders
    return {
        dir: {
            input: "src",
            output: "dist",
        },
        templateFormats : ["njk", "md", "html"]
    };
}