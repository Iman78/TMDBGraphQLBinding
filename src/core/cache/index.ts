const { movieGenresCache } = require("./movieGenresCache");
const { tvGenresCache } = require("./tvShowGenresCache");

tvGenresCache.loadData();
movieGenresCache.loadData();