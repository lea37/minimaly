const { DateTime }  = require("luxon");
const pluginRss     = require("@11ty/eleventy-plugin-rss");
// Import data files to use it for collection
const site = require('./src/_data/site.json');

module.exports = function(config) {
    config.addPassthroughCopy("src/images");
    config.addPassthroughCopy({"src/js/service-worker.js": "service-worker.js"});
    config.addPassthroughCopy({ "src/_includes/css/main.min.css": "css/main.min.css" });

    config.addFilter("dateDisplay", require("./src/filters/date.js") );

    config.addPlugin(pluginRss);

    // Get the first `n` elements of a collection.
    config.addFilter("head", (array, n) => {
        if( n < 0 ) {
          return array.slice(n);
        }

        return array.slice(0, n);
    });

    config.addTransform("htmlmin", require("./src/filters/minify-html.js"));

    // Posts collection
    config.addCollection("posts", function(collection) {
      return collection.getFilteredByGlob("./src/posts/*.md").reverse();
    });

    config.addCollection('lastPosts', collection => {
        return [...collection.getFilteredByGlob('./src/posts/*.md')]
          .reverse()
          .slice(0, site.maxPostsPerPage);
    });

    return {
        dir: {
            input: "src",
            output: "dist",
        },
        passthroughFileCopy: true,
        templateFormats : ["njk", "md", "html"]
    };
}